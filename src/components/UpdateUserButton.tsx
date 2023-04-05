import { Link } from "react-router-dom";
import { Images } from "@/libs/Images";
import { User } from "@/libs/types";
import Avatar from "./Avatar";

const UpdateUserButton = ({ user }: { user?: User }) => {
  return (
    <Link to={"editProfile"}>
      <button className="w-full relative">
        <div className="w-10 aspect-square rounded-full bg-gray-200 float-left">
          <Avatar size="md" src={user?.profileUrl || Images.user} />
        </div>
        <div className="absolute top-[2px] left-16">
          <span className="text-[12px] mr-2 ">{user?.name}</span>
          <span className="text-[10px] text-gray-400">{user?.birth}</span>
        </div>
        <div className="absolute bottom-[2px] left-16">
          <img
            src={Images.location}
            alt="지역 마크"
            className="mr-1 w-[10px] inline-block"
          />
          <span className="text-[10px]">{user?.area}</span>
        </div>
        <div className="text-[12px] inline-block absolute top-[12px] right-0 underline text-gray-400 ">
          수정
        </div>
      </button>
    </Link>
  );
};

export default UpdateUserButton;
