import useUser from "@/hooks/useUser";
import { imageMap, Images } from "@/libs/Images";

import { useEffect, useState } from "react";
import InterestSelect from "./InterestSelect";

const UpdateInterestButton = () => {
  const { user } = useUser();
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
      <div className="w-full mt-6 h-[32px] relative">
        {user &&
          user.favorites.map((item, idx) => {
            const srcImg = imageMap.get(item);
            console.log(srcImg);
            return (
              <img
                key={idx}
                src={srcImg}
                alt="관심사 이미지"
                className="inline-block mr-3 rounded-md w-8 bg-gray-300"
              />
            );
          })}
        <button
          onClick={() => {
            setInModal(true);
          }}
        >
          <div className="text-[12px] inline-block absolute top-[10px] right-0  underline text-gray-400 ">
            편집
          </div>
        </button>
      </div>
    </>
  );
};

export default UpdateInterestButton;
