import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <header
      className={`absolute flex items-center left-0 right-0 top-0 justify-between p-4 bg-white z-10 ${className}`}
    >
      {children}
    </header>
  );
}
