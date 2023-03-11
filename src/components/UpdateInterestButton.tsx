import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getUserChoiceInterest from "../util/getUserChoiceInterest";

const UpdateInterestButton = () => {
  const userChoice = getUserChoiceInterest();
  return (
    <Link to={"/update_detail"} state={userChoice}>
      <button className="w-full mt-5 relative">
        {userChoice.map((item: any, idx: number) => {
          return (
            <img
              src={item.image}
              key={idx}
              className="inline-block w-8 mr-3 bg-gray-200 float-left"
            />
          );
        })}
        <div className="text-[12px] inline-block absolute top-2.5 right-0  underline text-gray-400 ">
          편집
        </div>
      </button>
    </Link>
  );
};

export default UpdateInterestButton;
