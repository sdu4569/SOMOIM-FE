import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface FloatButtonProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export default function FloatButton({
  to,
  className,
  children,
}: FloatButtonProps) {
  return (
    <Link
      to={to}
      className={`shadow-md shadow-gray-500 w-16 h-16 text-white rounded-full bg-blue-500 space-y-1 flex flex-col justify-center items-center z-10 ${className}}`}
    >
      {children}
    </Link>
  );
}
