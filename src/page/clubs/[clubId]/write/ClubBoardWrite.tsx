import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";
import Overlay from "@/components/Overlay";

interface writeFormData {
  title: string;
  contents: string;
  category: string;
  firstPic: FileList;
  secondPic: FileList;
  thirdPic: FileList;
}

export default function ClubBoardWrite() {
  const formRef = useRef<HTMLFormElement>(null);
  const [inJoinModal, setInJoinModal] = useState<boolean>(false);
  const [category, setCategory] = useState("자유 글");
  const navigate = useNavigate();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<writeFormData>();

  const { ref } = register("contents");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!contentRef.current) return;

    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current?.scrollHeight + "px";
  }, [contentRef]);

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    setInJoinModal(true);
  }, []);

  useEffect(() => {
    // 첫번째 이미지 미리보기
    if (watch("firstPic")[0]) {
      const file = URL.createObjectURL(watch("firstPic")[0]);
      const previewImage = document.querySelector(
        "#firstPreview"
      ) as HTMLInputElement;
      previewImage.src = file;
    }

    // 두번째 이미지 미리보기
    if (watch("secondPic")[0]) {
      const file = URL.createObjectURL(watch("secondPic")[0]);
      const previewImage = document.querySelector(
        "#secondPreview"
      ) as HTMLInputElement;
      previewImage.src = file;
    }
    // 세번째 이미지 미리보기
    if (watch("thirdPic")[0]) {
      const file = URL.createObjectURL(watch("thirdPic")[0]);
      const previewImage = document.querySelector(
        "#thirdPreview"
      ) as HTMLInputElement;
      previewImage.src = file;
    }
  }, [watch("firstPic"), watch("secondPic"), watch("thirdPic")]);

  const onSubmit = (writeForm: writeFormData) => {
    writeForm.category = category;
    console.log(writeForm);

    navigate(-1);
  };

  const handleClick = (e: any) => {
    console.log(e.target.innerText);
    setCategory(e.target.innerText);
    setInJoinModal(false);
  };

  return (
    <>
      {inJoinModal && (
        <Overlay onClick={() => setInJoinModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" w-full h-[300px] mt-auto mb-auto ml-3 mr-3 flex bg-white self-end flex-col "
          >
            <div className="h-[50px] p-4 text-[20px]">게시글 카테고리</div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
            >
              자유 글
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
            >
              관심사 공유
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
            >
              정모후기
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
            >
              가입인사
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
            >
              공지사항
            </div>
          </div>
        </Overlay>
      )}
      <PageHeader>
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate ">게시글 작성</h1>
        </div>
        <button type="submit" className="text-xl" onClick={clickHandler}>
          완료
        </button>
      </PageHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="mt-12 ml-3 mr-3 flex flex-col"
      >
        <div className="flex border-y border-gray-200 items-center space-x-2 ">
          <input
            type="text"
            className="outline-none p-2 text-lg flex-1 relative"
            placeholder="제목 (40자)"
            {...register("title", { required: "제목을 입력해주세요." })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className="text-[14px] text-red-500 inline-block absolute left-[110px]">
                {message}
              </p>
            )}
          />
          <p className="text-blue-500 text-sm absolute right-4">{category}</p>
        </div>
        <textarea
          cols={30}
          rows={10}
          maxLength={30000}
          placeholder="가입인사는 작성 후 하루가 지나면&#13;&#10;가입인사 탭에만 보입니다."
          className=" w-full p-2 outline-none leading-5 relative resize-none"
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
            <p className="text-[14px] text-red-500 inline-block absolute left-[20px] top-[150px]">
              {message}
            </p>
          )}
        />

        <div className="flex mt-2 justify-between">
          <div className="flex space-x-2 ">
            <label
              htmlFor="first"
              className="relative border rounded-md p-2 border-gray-300  w-[65px] h-[65px]"
            >
              <img
                src={Images.preview}
                alt="첫번째 미리보기"
                className="w-[49px] h-[49px] rounded-md"
                id="firstPreview"
              />
            </label>
            <input
              type="file"
              id="first"
              className="hidden absolute file"
              {...register("firstPic")}
            />
            <label
              htmlFor="second"
              className="relative border rounded-md p-2 border-gray-300  w-[65px] h-[65px]"
            >
              <img
                src={Images.preview}
                alt="두번째 미리보기"
                className="w-[49px] h-[49px] rounded-md"
                id="secondPreview"
              />
            </label>
            <input
              type="file"
              id="second"
              className="hidden absolute file"
              {...register("secondPic")}
            />
            <label
              htmlFor="third"
              className="relative border rounded-md p-2 border-gray-300  w-[65px] h-[65px]"
            >
              <img
                src={Images.preview}
                alt="세번째 미리보기"
                className="w-[49px] h-[49px] rounded-md"
                id="thirdPreview"
              />
            </label>
            <input
              type="file"
              id="third"
              className="hidden absolute file"
              {...register("thirdPic")}
            />
          </div>
          <p className="flex items-end text-gray-400">
            {watch("contents")?.length} / 30000자
          </p>
        </div>
      </form>
    </>
  );
}
