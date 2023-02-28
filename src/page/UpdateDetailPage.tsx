import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Images } from "../components/Images";
import PageHeader from "../components/PageHeader";
import UserChoiceInterest from "../components/UserChoiceInterst";

const UpdateDetailPage = () => {
  const detail = UserChoiceInterest().map((item) => item.detail);

  return (
    <>
      <PageHeader children="상세 관심사" />
      <Link to={"/interest"}>
        <Button children="관심사 선택" className="w-full" />
      </Link>
      <div className="text-14 font-semibold mt-5">선택한 상세관심사</div>
      <div className="flex flex-wrap mt-5">
        {detail.map((item) => {
          return (
            <>
              {item.map((interest: string) => {
                return (
                  <p className="border-solid border-gray-300 border p-2 rounded-lg text-12 mb-3 mr-3 ">
                    <img
                      src={Images.check}
                      alt="체크표시"
                      className="inline-block w-3 mr-1"
                    />
                    {interest}
                  </p>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

export default UpdateDetailPage;
