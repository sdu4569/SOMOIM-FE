import { Link } from "react-router-dom";

export default function FetchFail() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h1>데이터 불러오기에 실패했습니다.</h1>
        <Link
          to={"/clubs"}
          className="border rounded-md text-blue-500 border-blue-500 p-4 hover:bg-blue-500 hover:text-white"
        >
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
