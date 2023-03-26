import { User } from "@/libs/types";
import { useState } from "react";
import InterestSelect from "./InterestSelect";

interface interestFormData {
  name: string[];
}

const UpdateInterestButton = () => {
  // const userChoice = user.favorite;
  const [inModal, setInModal] = useState<boolean>(false);
  const closeModal = () => {
    setInModal(false);
  };

  return (
    <>
      {inModal && (
        <div className="w-full h-full z-[200] absolute top-0 left-0 bg-white">
          <InterestSelect closeModal={closeModal} maxSelect={7} />
        </div>
      )}
      <button
        className="w-full mt-6 relative"
        onClick={() => {
          setInModal(true);
        }}
      >
        <div className="text-[12px] inline-block absolute top-2.5 right-0  underline text-gray-400 ">
          편집
        </div>
      </button>
    </>
  );
};

export default UpdateInterestButton;
