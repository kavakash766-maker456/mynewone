import express from "express";
import { createServer as createViteServer } from "vite";
import session from "express-session";
import { dbService } from "./src/lib/db.ts";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(session({
    secret: "hire-talents-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    }
  }));

  // --- Auth Routes ---

  app.get("/api/auth/url", (req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({ 
        error: "Google OAuth credentials are not configured in the environment variables." 
      });
    }

    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: `${process.env.APP_URL}/auth/callback`,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);
    res.json({ url: `${rootUrl}?${qs.toString()}` });
  });

  app.get("/auth/callback", async (req, res) => {
    const code = req.query.code as string;

    try {
      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${process.env.APP_URL}/auth/callback`,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenResponse.json() as any;
      const { access_token } = tokenData;

      // Get user info
      const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const googleUser = await userResponse.json() as any;

      // Check if user exists in DB
      let user = dbService.getUserByEmail(googleUser.email);

      if (!user) {
        user = dbService.createUser({
          id: googleUser.id,
          email: googleUser.email,
          name: googleUser.name,
          image: googleUser.picture,
        });
      }

      // Set session
      (req.session as any).userId = user.id;

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Auth error:", error);
      res.status(500).send("Authentication failed");
    }
  });

  app.get("/api/auth/session", (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.json({ user: null });

    const user = dbService.getUserById(userId);
    res.json({ user });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
