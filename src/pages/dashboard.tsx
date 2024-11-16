import Button from "../components/Button";
import ThemeToggle from "../components/ThemeToggle";
import UserList from "../components/UserList";
import { useAuth } from "../hooks/useAuthentication";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <>
      <div>
        <Button label="Logout" onClick={logout} />
        <ThemeToggle />
      </div>
      <UserList />;
    </>
  );
};

export default Dashboard;
