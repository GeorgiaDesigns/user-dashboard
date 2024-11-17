export type UserList = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface LoginSchema {
  email: string;
  email_confirm?: string;
  password: string;
}

export type LoginResponse = {
  id?: string;
  token: string;
};

export interface CurrentUserContextData {
  user?: User;
  token?: string;
  loading: boolean;
  loginAction: (data: LoginSchema) => Promise<void>;
  logout: () => void;
}
