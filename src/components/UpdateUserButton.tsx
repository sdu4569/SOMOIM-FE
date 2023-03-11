import { Link } from "react-router-dom";
import { Images } from "../libs/Images";

const userInfo = {
  userName: "서동욱",
  userImage: Images.user,
  userDescription: "",
  birthday: "1991-03-01",
  city: "부산광역시",
  gender: "male",
};

const UpdateUserButton = () => {
  return (
    <Link to={"/update_user"} state={userInfo}>
      <button className="w-full relative">
        <img
          src={userInfo.userImage}
          className="inline-block w-12 rounded-full bg-gray-200 float-left"
        />
        <div className="absolute top-2 left-16">
          <span className="text-12 mr-2 ">{userInfo.userName}</span>
          <span className="text-10 text-gray-400">{userInfo.birthday}</span>
        </div>
        <div className="absolute bottom-1 left-16">
          <img
            src={Images.location}
            alt="지역 마크"
            className="mr-1 w-[10px] inline-block"
          />
          <span className="text-10">{userInfo.city}</span>
        </div>
        <div className="text-12 inline-block absolute top-2 right-0 underline text-gray-400 ">
          수정
        </div>
      </button>
    </Link>
  );
};

export default UpdateUserButton;
