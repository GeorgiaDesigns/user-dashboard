import { ButtonHTMLAttributes } from "react";

export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = {
  label: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
} & ButtonTypes;

const Button = ({
  label,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      {...props}
      className="mt-10 bg-white text-[#080710] p-4 text-lg font-semibold rounded-md hover:bg-opacity-90 transition-all"
    >
      {label}
    </button>
  );
};

export default Button;
