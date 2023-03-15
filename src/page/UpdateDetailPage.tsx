import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import HeaderBackButton from "../components/HeaderBackButton";
import { Images } from "../libs/Images";
import PageHeader from "../components/PageHeader";
import getUserChoiceInterest from "../util/getUserChoiceInterest";

const UpdateDetailPage = () => {
  const detail = getUserChoiceInterest().map((item: any) => item.detail);
  return (
    <div className="h-full py-16 px-4 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">상세 관심사</h1>
        </div>
      </PageHeader>
      <div>
        <Link to={"/interest"}>
          <Button children="관심사 선택" className="w-full" />
        </Link>
        <div className="text-[14px] font-semibold mt-5">선택한 상세관심사</div>
        <div className="flex flex-wrap mt-5">
          {detail.flat().map((interest: string, index: number) => {
            return (
              <p
                key={index}
                className="border-solid border-gray-300 border p-2 rounded-lg text-[12px] mb-3 mr-3 "
              >
                <img
                  src={Images.check}
                  alt="체크표시"
                  className="inline-block w-3 mr-1"
                />
                {interest}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpdateDetailPage;
