import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import AuthProvider, { useAuth } from "./hooks/useAuthentication";

const PrivateRoute = () => {
  const token = useAuth();
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
