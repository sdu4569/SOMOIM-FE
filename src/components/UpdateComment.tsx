import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Overlay from "./Overlay";

interface commentFormData {
  comment: string;
}

interface CommentProps {
  selectComment: any[];
  setCommentList: React.Dispatch<React.SetStateAction<any[]>>;
  closeModal: () => void;
  commentArr: any[];
  selectKey?: number;
}

export default function UpdateComment({
  selectComment,
  setCommentList,
  closeModal,
  commentArr,
  selectKey,
}: CommentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<commentFormData>();

  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { ref } = register("comment");
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (errors.comment) {
      alert(errors.comment.message);
    }
  }, [errors.comment]);

  useEffect(() => {
    setValue("comment", selectComment[0]?.comment);
    console.log(selectComment[0]?.comment);
  }, [selectComment]);

  const clickHandler = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
    closeModal();
  };
  const onUpdate = (commentForm: commentFormData) => {
    console.log(commentForm.comment);
    selectComment[0].comment = commentForm.comment;
    commentArr = commentArr.filter((item) => item.id !== selectKey);
    commentArr.push(selectComment[0]);
    commentArr.sort(function (a, b) {
      return a.id - b.id;
    });
    localStorage.setItem(
      `${params.clubId}_${params.postId} comment`,
      JSON.stringify(commentArr)
    );
    setCommentList(commentArr);
    console.log(commentArr);
  };

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
            ref={(e) => {
              ref(e);
              commentRef.current = e;
            }}
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
