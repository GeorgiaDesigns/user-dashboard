import { useForm, SubmitHandler } from "react-hook-form";
import { LoginResponse, LoginSchema } from "../utils/definitions";
type FormProps = {
  isLogin: boolean;
  submitFunc: (data: LoginSchema) => Promise<LoginResponse>;
};
const Form = ({ isLogin, submitFunc }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();
  const onSubmit: SubmitHandler<LoginSchema> = (data) => submitFunc(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[400px] h-[520px] bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 rounded-lg shadow-lg p-10 flex flex-col justify-center"
    >
      <h3 className="text-2xl font-semibold text-center mb-8">
        {isLogin ? "Login to your dashboard" : "Signup"}
      </h3>

      <input
        type="text"
        placeholder="Username"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
        {...register("username", {
          required: true,
          minLength: 3,
        })}
      />
      {errors.username && errors.username.type === "required" && (
        <p className="errorMsg">Username is required.</p>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <p className="errorMsg">Username is not valid.</p>
      )}

      <input
        type="email"
        placeholder="E-mail"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
        {...register("email", {
          required: true,
          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        })}
      />
      {errors.email && errors.email.type === "required" && (
        <p className="errorMsg">Email is required.</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p className="errorMsg">Email is not valid.</p>
      )}

      <input
        type="password"
        placeholder="Senha"
        className="mt-2 h-[50px] w-full bg-white bg-opacity-10 rounded-md px-4 text-sm placeholder-white placeholder-opacity-70 focus:outline-none"
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

      <button type="submit">{isLogin ? "Login" : "Signup"}</button>
    </form>
  );
};

export default Form;
