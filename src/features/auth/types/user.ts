export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  setUser: (u: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
