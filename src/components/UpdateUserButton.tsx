import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "@/page/more/editProfile/UpdateUserPage";
import { Images } from "@/libs/Images";

const UpdateUserButton = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users/1",
    fetcher
  );

  return (
    <Link to={"editProfile"}>
      <button className="w-full relative">
        <img
          src={Images.user}
          className="inline-block w-12 h-12 rounded-full bg-gray-200 float-left"
        />
        <div className="absolute top-2 left-16">
          <span className="text-[12px] mr-2 ">{data?.name}</span>
          <span className="text-[10px] text-gray-400">{data?.birth}</span>
        </div>
        <div className="absolute bottom-1 left-16">
          <img
            src={Images.location}
            alt="지역 마크"
            className="mr-1 w-[10px] inline-block"
          />
          <span className="text-[10px]">{data?.city}</span>
        </div>
        <div className="text-[12px] inline-block absolute top-2 right-0 underline text-gray-400 ">
          수정
        </div>
      </button>
    </Link>
  );
};

export default UpdateUserButton;
