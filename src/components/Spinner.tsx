interface SpinnerProps {
  size: SpinnerSize;
  className?: string;
}

type SpinnerSize = "sm" | "md" | "lg";

const sizeObj = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export default function Spinner({ size, className }: SpinnerProps) {
  return (
    <div
      className={`${sizeObj[size]} ${className} border-2 rounded-full border-gray-100 border-t-black animate-spin`}
    ></div>
  );
}
