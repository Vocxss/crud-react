interface IButton {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  variant?: "default" | "outline";
}

export const Button = ({ children, onClick, variant = "default", type = "button" }: IButton) => {
  return (
    <button
      type={type}
      className={`cursor-pointer text-background bg-primary px-4 py-2 rounded-full md:text-sm text-xs font-mono hover:shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all ${
        variant === "outline"
          ? "bg-transparent border border-primary text-primary hover:bg-primary hover:text-background"
          : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
