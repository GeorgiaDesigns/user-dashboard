import Button from "../components/Button";
import Form from "../components/Form";
import { loginUser } from "../services/api";

export default function Login() {
  return (
    <div className="grid items-center justify-items-center max-h-screen p-6 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form isLogin submitFunc={loginUser} />
        <Button label="Go to Signup" />
      </main>
    </div>
  );
}
