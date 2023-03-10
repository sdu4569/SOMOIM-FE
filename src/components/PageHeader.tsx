import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ children, className }: PageHeaderProps) {
  return (
    /*
    <header className="mb-4 flex items-center justify-between ml-2">
      <div className="flex space-x-4 items-center">
        {back && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-black text-xl cursor-pointer"
            onClick={onBackClick}
          />
        )}
        <h2 className="text-xl text-black">{title}</h2>
      </div>
      {next && (
        <input
          type="submit"
          value={next}
          className="cursor-pointer text-xl bg-transparent text-black p-0 border-none focus:outline-none"
        />
      )}
      */
    <header
      className={`absolute flex items-center left-0 right-0 top-0 justify-between p-4 bg-white z-10 ${className}`}
    >
      {children}
    </header>
  );
}
