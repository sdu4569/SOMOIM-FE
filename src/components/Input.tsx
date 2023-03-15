interface InputProps {
  className?: string;
  [key: string]: any;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`rounded-md bg-gray-100 text-black outline-none p-4 ${className}`}
      {...rest}
    />
  );
}
