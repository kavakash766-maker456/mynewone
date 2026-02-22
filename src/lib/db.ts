import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('database.db');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    image TEXT,
    role TEXT DEFAULT 'Worker',
    balance REAL DEFAULT 0
  )
`);

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  role: string;
  balance: number;
}

export const dbService = {
  getUserByEmail: (email: string): User | undefined => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
  },
  createUser: (user: Omit<User, 'role' | 'balance'>): User => {
    const stmt = db.prepare(`
      INSERT INTO users (id, email, name, image, role, balance)
      VALUES (?, ?, ?, ?, 'Worker', 0)
    `);
    stmt.run(user.id, user.email, user.name, user.image);
    return { ...user, role: 'Worker', balance: 0 };
  },
  getUserById: (id: string): User | undefined => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
  }
};

export default db;
