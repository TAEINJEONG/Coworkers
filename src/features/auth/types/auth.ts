export interface User {
  id: number;
  email: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  teamId: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
