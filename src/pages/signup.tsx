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
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              },
            },
            {
              id: "email_confirm",
              type: "email",
              place_holder: "Confirm e-mail",
              validations: {
                required: { value: true, message: "Email is required" },
              },
            },
            {
              id: "password",
              type: "password",
              place_holder: "Enter a password",
              validations: {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 chars",
                },
              },
            },
          ]}
          label={"Signup"}
        />
        <Button
          label="Go to Login"
          onClick={() => navigate("/login")}
          data-test="login-button"
        />
      </main>
    </div>
  );
}
