import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserChoiceInterest from "./UserChoiceInterst";

const UpdateInterestButton = () => {
  const userChoice = UserChoiceInterest();
  return (
    <Link to={"/update_detail"} state={userChoice} className="relative">
      <button className="w-full mt-5 flex justify-start">
        {userChoice.map((item, idx) => {
          return (
            <img
              src={item.image}
              key={idx}
              className="inline-block w-8 mr-3 bg-gray-200"
            />
          );
        })}
      </button>
      <div className="text-12 inline-block absolute top-2.5 right-0 underline text-gray-400 ">
        편집
      </div>
    </Link>
  );
};

export default UpdateInterestButton;
