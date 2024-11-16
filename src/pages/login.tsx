import Button from "../components/Button";
import Form from "../components/Form";
import { useAuth } from "../hooks/useAuthentication";

export default function Login() {
  const { loginAction } = useAuth();

  return (
    <div className="grid items-center justify-items-center max-h-screen p-6 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form isLogin submitFunc={loginAction} />
        <Button label="Go to Signup" />
      </main>
    </div>
  );
}
