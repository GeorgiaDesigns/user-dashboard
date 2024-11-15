export type UserList = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface LoginSchema {
  username: string;
  email: string;
  password: string;
}

export type LoginResponse = {
  id?: string;
  token: string;
};

export interface CurrentUserContextData {
  token: string;
  loginAction: (data: LoginSchema) => Promise<void>;
  logout: () => void;
}
