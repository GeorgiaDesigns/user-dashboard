import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import { registerUser } from "../services/api";
import { useAuth } from "../hooks/useAuthentication";
import { LoginSchema } from "../utils/definitions";

export default function Signup() {
  const { loginAction } = useAuth();

  const navigate = useNavigate();

  const signup = async (data: LoginSchema) => {
    await registerUser(data);
    await loginAction(data);
  };

  return (
    <div className="grid items-center justify-items-center max-h-screen p-6 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form
          submitFunc={signup}
          inputList={[
            {
              id: "email",
              type: "email",
              place_holder: "E-mail",
              validations: {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              },
            },
            {
              id: "email_confirm",
              type: "email",
              place_holder: "Confirm e-mail",
              validations: {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              },
            },
            {
              id: "password",
              type: "password",
              place_holder: "Enter a password",
              validations: {
                required: true,
                minLength: 6,
              },
            },
          ]}
          label={"Signup"}
        />
        <Button label="Go to Login" onClick={() => navigate("/signup")} />
      </main>
    </div>
  );
}
