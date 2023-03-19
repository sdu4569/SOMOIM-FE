import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "../page/UpdateUserPage";
import { Images } from "../libs/Images";
import Overlay from "./Overlay";

interface greetingFormData {
  greeting?: string;
}

interface JoinClubProps {
  closeModal: () => void;
}

export default function JoinClub({ closeModal }: JoinClubProps) {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users/1",
    fetcher
  );

  const [secondModal, setSecondModal] = useState<Boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("greeting", "");
  }, [data]);

  const onSubmit = (e: greetingFormData) => {
    console.log(e);

    // axios.post("https://jsonplaceholder.typicode.com/users/1", e);
  };

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
    closeModal();
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="relative h-[56px] "
        >
          <input
            type="text"
            className="rounded-md p-2 w-full bg-gray-300 outline-none h-[40px] text-[12px] mt-2 mb-2"
            placeholder="가입인사를 작성해주세요!"
            {...register("greeting")}
          />
        </form>

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
            onClick={
              watch("greeting")?.length == 0
                ? () => {
                    setSecondModal(true);
                  }
                : clickHandler
            }
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
