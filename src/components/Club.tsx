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
