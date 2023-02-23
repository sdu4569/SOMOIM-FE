interface InputProps {
  className?: string;
  [key: string]: any;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`rounded-md bg-gray-300 px-4 py-2 ${className}`}
      {...rest}
    />
  );
}
