import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function HeaderBackButton() {
  const navigate = useNavigate();
  return (
    <FontAwesomeIcon
      icon={faArrowLeft}
      className="text-black text-xl cursor-pointer"
      onClick={() => navigate(-1)}
    />
  );
}
