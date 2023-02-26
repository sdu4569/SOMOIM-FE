import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
interface PageHeaderProps {
  back?: boolean;
  onBack?: any;
  title: string;
  next?: string;
}

export default function PageHeader({
  back,
  onBack,
  title,
  next,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const onBackClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return (
    <header className="absolute flex items-center left-0 right-0 top-0 justify-between p-4 bg-white z-50">
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
      {next && (
        <input
          type="submit"
          value={next}
          className="cursor-pointer text-xl bg-transparent text-black p-0 border-none focus:outline-none"
        />
      )}
    </header>
  );
}
