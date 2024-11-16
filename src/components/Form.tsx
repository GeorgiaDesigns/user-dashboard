import { useForm } from "react-hook-form";
import { LoginSchema } from "../utils/definitions";
import Button from "./Button";
import { useAuth } from "../hooks/useAuthentication";
type FormProps = {
  isLogin: boolean;
  submitFunc: (data: LoginSchema) => Promise<void>;
};
const Form = ({ isLogin, submitFunc }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();

  const { loading } = useAuth();

  return (
    <form
      onSubmit={handleSubmit(async (data) => await submitFunc(data))}
      className="relative w-[400px] h-[520px] bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 backdrop-blur-md border border-opacity-10 rounded-lg shadow-lg p-10 flex flex-col justify-center"
    >
      <h3 className="text-2xl font-semibold text-center mb-8">
        {isLogin ? "Login to your dashboard" : "Signup"}
      </h3>

      <input
        type="email"
        placeholder="E-mail"
        className="mt-2 h-[50px] w-full bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
        {...register("email", {
          required: true,
          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        })}
      />

      {!isLogin ? (
        <input
          type="email"
          placeholder="E-mail"
          className="mt-2 h-[50px] w-full bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
          {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          })}
        />
      ) : null}

      {errors.email && errors.email.type === "required" && (
        <p className="errorMsg">Email is required.</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p className="errorMsg">Email is not valid.</p>
      )}

      <input
        type="password"
        placeholder="Senha"
        className="mt-2 h-[50px] w-full bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
        {...register("password", {
          required: true,
          minLength: 6,
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p className="errorMsg">Password is required.</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p className="errorMsg">Password should be at-least 6 characters.</p>
      )}

      <Button
        type="submit"
        label={isLogin ? "Login" : loading ? "...Loading" : "Signup"}
      />
    </form>
  );
};

export default Form;
