import { Link } from "react-router-dom";
import { Images } from "./Images";

const InterestClubButton = () => {
  return (
    <Link to={"/interest_club"}>
      <button className="w-full mt-5 text-left h-8 border-solid border-b-2 pb-2 border-gray-200">
        <img src={Images.heart} className="inline-block w-4 mr-3" />
        <span className="inline-block">찜한 클럽</span>
        <img src={Images.rightArrow} className="float-right w-4" />
      </button>
    </Link>
  );
};

export default InterestClubButton;
