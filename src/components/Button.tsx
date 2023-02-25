interface ButtonProps {
  onClick?: () => void;
  className?: string;
  [key: string]: any;
  children?: React.ReactNode;
}

export default function Button({
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md bg-blue-500 text-white outline-none focus:outline-none p-4 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
