import { Link } from "react-router-dom";
import { Images } from "../libs/Images";

const RecentClubButton = () => {
  return (
    <Link to={"/recent_club"}>
      <button className="w-full mt-5 text-left h-8 border-solid border-b-2 pb-2 border-gray-200">
        <img src={Images.search} className="inline-block w-4 mr-3" />
        <span className="inline-block">최근 본 클럽</span>
        <img src={Images.rightArrow} className="float-right w-4" />
      </button>
    </Link>
  );
};

export default RecentClubButton;
