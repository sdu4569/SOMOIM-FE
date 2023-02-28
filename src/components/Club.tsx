import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClubList } from "./ClubList";

const Club = (e: any) => {
  const recommendClubList = ClubList.filter((item) => {
    return item.interest == e.interest;
  });

  return (
    <>
      {recommendClubList.slice(0, 5).map((item, idx) => {
        return (
          <Link to={``} key={idx}>
            <div className="relative mt-3">
              <img
                src={item.clubImage}
                alt="클럽 이미지"
                className="w-10 rounded-xl inline-block border-dashed border-2 border-gray-500"
              />
              <div className="text-12 absolute top-1 left-14">
                <img
                  src={item.interestImage}
                  className="h-3 inline-block mr-1"
                  alt="관심사 이미지"
                />
                {item.clubTitle}
              </div>
              <div className="text-10 absolute top-6 left-14">
                <span className="border-r-2 border-solid border-gray-200 pr-1 mr-1">
                  {item.country}
                </span>
                <span className="text-gray-400">멤버 {item.member} </span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Club;
/*
export default function Club() {
  return (
    <div className="flex space-x-4">
      <div className="rounded-3xl w-16 aspect-square bg-blue-500 relative">
        <div className="text-white absolute bg-red-600 rounded-2xl p-1 text-xs flex justify-center items-center -top-1 -right-1 text-[8px]">
          NEW
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <span className="">클럽 이름</span>
        <span className="text-sm text-gray-500">클럽 설명</span>
        <div className="flex space-x-2 text-xs">
          <div className="flex divide-x-2 divide-gray-300 items-center">
            <span className="pr-1">지역</span>
            <span className="pl-1 text-gray-500">멤버 236</span>
          </div>
          <div className="rounded-full bg-gray-200 text-gray-500 px-1 text-[8px]">
            아웃도어/여행
          </div>
        </div>
      </div>
    </div>
  );
}
*/
