import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import { useAuth } from "../hooks/useAuthentication";

export default function Login() {
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="grid items-center justify-items-center max-h-screen p-6 sm:p-20">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form
          submitFunc={loginAction}
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
              id: "password",
              type: "password",
              place_holder: "Password required",
              validations: {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password is too short",
                },
              },
            },
          ]}
          label={"Login"}
        />
        <Button
          label="Go to Signup"
          onClick={() => navigate("/signup")}
          data-test="signup-button"
        />
      </div>
    </div>
  );
}
