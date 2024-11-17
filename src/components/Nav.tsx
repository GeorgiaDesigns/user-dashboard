import Button from "../components/Button";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuthentication";

const Nav = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex p-2 w-full bg-gray-100 gap-4 items-baseline justify-around 30 dark:bg-gray-900 dark:text-gray-100">
      <h1>
        Welcome to the user management dashboard {user && user.first_name}!
      </h1>
      <ThemeToggle />
      <Button label="Logout" onClick={logout} />
    </nav>
  );
};

export default Nav;
