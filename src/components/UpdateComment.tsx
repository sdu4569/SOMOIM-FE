import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import Overlay from "./Overlay";

interface commentFormData {
  comment: string;
}

interface CommentProps {
  inputValue: string;
  formRef: React.RefObject<HTMLFormElement>;
  closeModal: () => void;
  clickHandler: () => void;
  onUpdate: (commentForm: commentFormData) => void;
}

export default function UpdateComment({
  inputValue,
  formRef,
  closeModal,
  clickHandler,
  onUpdate,
}: CommentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<commentFormData>();

  useEffect(() => {
    if (errors.comment) {
      alert(errors.comment.message);
    }
  }, [errors.comment]);

  useEffect(() => {
    setValue("comment", inputValue);
    console.log(inputValue);
  }, [inputValue]);

  return (
    <Overlay onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl w-full h-[210px] p-4 m-4 flex bg-white self-end flex-col justify-between "
      >
        <div className="h-[30px] p-1">댓글수정</div>
        <form onSubmit={handleSubmit(onUpdate)} ref={formRef}>
          <textarea
            rows={2}
            className="bg-gray-100 py-4 px-3 rounded-lg flex-1 outline-none w-full h-[96px] resize-none text-[16px] max-h-[96px]"
            {...register("comment")}
          />
        </form>
        <div className=" flex divide-x w-full divide-gray-300 mt-2 mb-2">
          <button
            className="flex justify-center items-center flex-1"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type="button"
            className="flex justify-center items-center flex-1"
            onClick={clickHandler}
          >
            확인
          </button>
        </div>
      </div>
    </Overlay>
  );
}
