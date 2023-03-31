import { useForm } from "react-hook-form";
import { Images } from "@/libs/Images";
import { useState } from "react";
import Overlay from "./Overlay";
import usePostRequest from "@/hooks/usePostRequest";
import Spinner from "./Spinner";

interface greetingFormData {
  introduction?: string;
}

interface JoinClubProps {
  closeModal: () => void;
  clubId: string;
  membersBoundMutate: any;
}

export default function JoinClub({
  closeModal,
  clubId,
  membersBoundMutate,
}: JoinClubProps) {
  const [secondModal, setSecondModal] = useState<Boolean>(false);

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate, isLoading } = usePostRequest(`clubs/${clubId}/join`, {
    authorized: true,
  });

  const onSubmit = async (formData: greetingFormData) => {
    if (formData.introduction?.trim().length == 0) {
      setSecondModal(true);
      return;
    }

    const result = await mutate();

    if (result.ok) {
      alert("가입되었습니다.");
      membersBoundMutate();
      closeModal();
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      {secondModal && (
        <Overlay onClick={() => setSecondModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl w-full h-[100px] p-4 m-4 flex bg-white self-end flex-col justify-evenly animate-slide-up"
          >
            <div className="h-[30px] p-1">가입인사를 작성해주세요.</div>
            <div className=" flex divide-x w-full divide-gray-300 mt-2 mb-2">
              <button
                className="flex justify-center items-center flex-1 "
                onClick={() => setSecondModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </Overlay>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl w-full h-[180px] p-4 m-4 flex bg-white self-end flex-col translate-y-2 animate-slide-up"
      >
        <header className="flex justify-between h-[56px]">
          <h1 className="text-[18px] mt-auto mb-auto">
            가입인사를 작성해주세요.
          </h1>
          <img
            src={Images.user}
            alt="유저 이미지"
            className="w-10 h-10 mt-auto mb-auto"
          />
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="relative h-[56px] ">
          <input
            type="text"
            className="rounded-md p-2 w-full bg-gray-100 outline-none h-[40px] text-[12px] mt-2 mb-2"
            placeholder="가입인사를 작성해주세요!"
            {...register("introduction")}
          />
          <div className="text-blue-500 flex divide-x w-full divide-gray-300 mt-2 mb-2">
            <button
              className="flex justify-center items-center flex-1"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex justify-center items-center flex-1"
            >
              {isLoading ? <Spinner size="sm" /> : "가입"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
