import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  CurrentUserContextData,
  LoginResponse,
  LoginSchema,
  User,
} from "../utils/definitions";
import { getAllUsers, loginUser } from "../services/api";

const AuthContext = createContext<CurrentUserContextData>(
  {} as CurrentUserContextData
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState(localStorage.getItem("tok") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserByEmail = async (email: string) => {
    const userList = await getAllUsers();
    return userList.data.find((u) => u.email === email);
  };

  const loginAction = async (data: LoginSchema) => {
    setLoading(true);
    try {
      const res: LoginResponse = await loginUser(data);
      if (res) {
        setToken(res.token);
        localStorage.setItem("tok", res.token);
        const currentUser = await getUserByEmail(data.email);
        setUser(currentUser);
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.error(err);
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(undefined);
    setToken("");

    localStorage.removeItem("tok");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
