import { RegisterOptions, useForm } from "react-hook-form";
import { LoginSchema } from "../utils/definitions";
import Button from "./Button";
import { useAuth } from "../hooks/useAuthentication";
import React from "react";

type InputType = {
  id: keyof LoginSchema;
  type: "date" | "email" | "number" | "password" | "tel" | "text";
  place_holder: string;
  validations: RegisterOptions<LoginSchema, keyof LoginSchema>;
};

type FormProps = {
  submitFunc: (data: LoginSchema) => Promise<void>;
  inputList: InputType[];
  label: string;
};

const Form = ({ submitFunc, inputList, label }: FormProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();

  const { loading } = useAuth();

  return (
    <form
      onSubmit={handleSubmit(async (data) => await submitFunc(data))}
      className="relative gap-8 w-[400px] h-[520px] bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 backdrop-blur-md border border-opacity-10 rounded-lg shadow-lg p-10 flex flex-col justify-center"
    >
      <h3 className="text-2xl font-semibold text-center">{label}</h3>
      <div>
        {inputList.map((i, n) => (
          <React.Fragment key={n}>
            <input
              type={i.type}
              placeholder={i.place_holder}
              className="mt-2 h-[50px] w-full bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
              {...register(i.id, {
                ...i.validations,
                validate:
                  i.id === "email_confirm"
                    ? (value) =>
                        value === getValues("email") || "Emails do not match"
                    : i.validations.validate,
              })}
            />

            {errors[i.id] && (
              <p className="errorMsg">{errors[i.id]?.message}</p>
            )}
          </React.Fragment>
        ))}
      </div>
      <Button type="submit" label={loading ? "...loading" : label} />
    </form>
  );
};

export default Form;
