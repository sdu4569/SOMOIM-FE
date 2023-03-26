import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";
import getUserChoiceInterest from "@/util/getUserChoiceInterest";
import InterestSelect from "@/components/InterestSelect";
import InterestDetailSelect from "@/components/InterestDetailSelect";

interface InterestWithDetails {
  name: string[];
  detail: string[];
}

const enum ModalType {
  INTEREST = "interest",
  INTEREST_DETAIL = "interestDetail",
}

const UpdateDetailPage = () => {
  const [detail, setDetail] = useState([]);
  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [clubInterest, setClubInterest] = useState<InterestWithDetails>();

  const closeModal = () => {
    setInModal(false);
  };

  useEffect(() => {
    console.log(clubInterest);
    if (clubInterest !== undefined) {
      localStorage.setItem("userChoice", JSON.stringify(clubInterest.detail));
    }
    const updateDetail = getUserChoiceInterest();
    setDetail(updateDetail);
  }, [clubInterest]);
  return (
    <>
      {inModal &&
        modalType &&
        {
          interest: (
            <div className="w-full h-full z-[200] absolute bg-white">
              <InterestSelect closeModal={closeModal} maxSelect={7} />
            </div>
          ),
          interestDetail: clubInterest && (
            <div className="w-full h-full z-[200] absolute bg-white">
              <InterestDetailSelect
                closeModal={closeModal}
                interests={clubInterest.name}
                onComplete={(data) => {
                  let interestName: string[] = [];
                  let interestDetail: any[] = [];
                  data.map((item) => {
                    interestName.push(item.name);
                    interestDetail.push(item.detail);
                  });
                  setClubInterest({
                    name: interestName,
                    detail: interestDetail.flat(Infinity),
                  });
                  closeModal();
                }}
              />
            </div>
          ),
        }[modalType]}
      <div className="h-full py-16 px-4 overflow-auto">
        <PageHeader>
          <div className="flex items-center space-x-4 h-full overflow-hidden">
            <HeaderBackButton />
            <h1 className="text-xl whitespace-nowrap truncate">상세 관심사</h1>
          </div>
        </PageHeader>
        <div>
          <Button
            children="관심사 선택"
            className="w-full"
            onClick={() => {
              setInModal(true);
              setModalType(ModalType.INTEREST);
            }}
          />

          <div className="text-[14px] font-semibold mt-5">
            선택한 상세관심사
          </div>
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
    </>
  );
};

export default UpdateDetailPage;
