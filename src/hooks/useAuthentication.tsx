import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  CurrentUserContextData,
  LoginResponse,
  LoginSchema,
} from "../utils/definitions";
import { loginUser } from "../services/api";

const AuthContext = createContext<CurrentUserContextData>(
  {} as CurrentUserContextData
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  //const [user, setUser] = useState<User>();
  const [token, setToken] = useState(localStorage.getItem("tok") || "");
  const navigate = useNavigate();
  const loginAction = async (data: LoginSchema) => {
    try {
      const res: LoginResponse = await loginUser(data);
      if (res) {
        setToken(res.token);
        localStorage.setItem("tok", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    // setUser(undefined);
    setToken("");
    localStorage.removeItem("tok");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
