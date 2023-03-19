import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HeaderBackButton from "../components/HeaderBackButton";
import PageHeader from "../components/PageHeader";

export interface postFormData {
  title: string;
  contents: string;
  category: string;
}

export default function UpdateClubPostPage() {
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<postFormData>();

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  const onSubmit = (postForm: postFormData) => {
    console.log(postForm);

    // axios.patch("https://jsonplaceholder.typicode.com/users/1", postForm);

    navigate(-1);
  };

  const { ref } = register("contents");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!contentRef.current) return;

    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current?.scrollHeight + "px";
  }, [contentRef]);

  return (
    <>
      <div className="h-full overflow-scroll">
        <PageHeader>
          <div className="flex items-center space-x-4 h-full overflow-hidden">
            <HeaderBackButton />
            <h1 className="text-xl whitespace-nowrap truncate ">클럽 이름</h1>
          </div>
          <button type="submit" className="text-xl" onClick={clickHandler}>
            완료
          </button>
        </PageHeader>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="flex flex-col p-3 mt-14">
            <select
              className="w-[150px] rounded-full p-1 border-black border"
              {...register("category")}
            >
              <option value="free">자유 글</option>
              <option value="share">관심사 공유</option>
              <option value="meeting">정모후기</option>
              <option value="greeting">가입인사</option>
              <option value="notice">공지사항</option>
            </select>
          </div>

          <div className="flex border-y border-gray-200 items-center space-x-2 ">
            <input
              type="text"
              className="outline-none p-3 text-lg flex-1 relative"
              placeholder="제목 (40자)"
              {...register("title", { required: "제목을 입력해주세요." })}
            />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => (
                <p className="text-[14px] text-red-500 inline-block absolute left-[100px]">
                  {message}
                </p>
              )}
            />
          </div>
          <textarea
            cols={30}
            rows={10}
            maxLength={30000}
            placeholder="가입인사는 작성 후 하루가 지나면&#13;&#10;가입인사 탭에만 보입니다."
            className=" w-full p-3 outline-none leading-5 relative resize-none"
            {...register("contents", { required: "내용을 입력해주세요." })}
            onInput={handleResizeHeight}
            ref={(e) => {
              ref(e);
              contentRef.current = e;
            }}
          />
          <ErrorMessage
            errors={errors}
            name="contents"
            render={({ message }) => (
              <p className="text-[14px] text-red-500 inline-block absolute left-[13px] top-[230px]">
                {message}
              </p>
            )}
          />
        </form>
        <p className="flex justify-end pr-2 text-gray-400">
          {watch("contents")?.length} / 30000자
        </p>
      </div>
    </>
  );
}
