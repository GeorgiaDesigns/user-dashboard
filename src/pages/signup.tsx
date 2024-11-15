import Button from "../components/Button";
import Form from "../components/Form";
import { registerUser } from "../services/api";

export default function Signup() {
  return (
    <div className="grid items-center justify-items-center max-h-screen p-6 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form isLogin submitFunc={registerUser} />
        <Button label="Go to Login" />
      </main>
    </div>
  );
}
