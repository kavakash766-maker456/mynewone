export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  role: string;
  balance: number;
}

export interface AuthSession {
  user: User | null;
}
