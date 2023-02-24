import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
interface PageHeaderProps {
  back?: boolean;
  title: string;
  onNext?: () => void;
  next?: string;
}

export default function PageHeader({
  back,
  title,
  onNext,
  next,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(-1);
  };
  return (
    <header className="mb-4 flex items-center justify-between">
      <div className="flex space-x-4 items-center">
        {back && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-black text-2xl cursor-pointer"
            onClick={onBackClick}
          />
        )}
        <h2 className="text-2xl text-black">{title}</h2>
      </div>
      <button
        onClick={onNext}
        className="text-xl bg-transparent text-black p-0 border-none focus:outline-none"
      >
        {next}
      </button>
    </header>
  );
}
