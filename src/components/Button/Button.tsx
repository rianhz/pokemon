import React from "react";

const Button = ({
  children,
  type,
  onClick,
  className,
}: {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border border-2 border-solid border-gray-400 rounded-lg py-2 px-8 transition duration-[0.5s] font-bold ${className} hover:bg-slate-700 hover:text-white`}
    >
      {children}
    </button>
  );
};

export default Button;
