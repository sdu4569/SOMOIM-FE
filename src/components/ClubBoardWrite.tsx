import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HeaderBackButton from "./HeaderBackButton";
import { Images } from "../libs/Images";
import PageHeader from "./PageHeader";

interface writeFormData {
  title?: string;
  contents?: string;
  firstPic?: object;
  secondPic?: object;
  thirdPic?: object;
}

export default function ClubBoardWrite() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    setValue("title", "");
    setValue("contents", "");
  }, []);

  useEffect(() => {
    // 첫번째 이미지 미리보기
    function readImage(input: HTMLInputElement) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e: any) => {
          console.log(e.target);
          const previewImage = document.querySelector(
            "#firstPreview"
          ) as HTMLInputElement;
          previewImage.src = e.target.result;
        };
      }
    }

    const firstImage = document.querySelector("#first") as HTMLInputElement;
    firstImage.addEventListener("change", (e: any) => {
      readImage(e.target);
    });
  }, []);

  useEffect(() => {
    // 두번째 이미지 미리보기
    function readImage(input: HTMLInputElement) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e: any) => {
          const previewImage = document.querySelector(
            "#secondPreview"
          ) as HTMLInputElement;
          previewImage.src = e.target.result;
        };
      }
    }

    const secondImage = document.querySelector("#second") as HTMLInputElement;
    secondImage.addEventListener("change", (e: any) => {
      readImage(e.target);
    });
  }, []);

  useEffect(() => {
    // 세번째 이미지 미리보기
    function readImage(input: HTMLInputElement) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e: any) => {
          const previewImage = document.querySelector(
            "#thirdPreview"
          ) as HTMLInputElement;
          previewImage.src = e.target.result;
        };
      }
    }

    const thirdImage = document.querySelector("#third") as HTMLInputElement;
    thirdImage.addEventListener("change", (e: any) => {
      readImage(e.target);
    });
  }, []);

  const onSubmit = (writeForm: writeFormData) => {
    console.log(writeForm);

    navigate(-1);
  };

  return (
    <>
      <PageHeader className="">
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
        className="mt-12 flex flex-col"
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
              <p className="text-[7px] text-red-500 inline-block absolute left-[110px]">
                {message}
              </p>
            )}
          />
          <p className="text-blue-500 text-sm">자유 글</p>
        </div>
        <textarea
          cols={30}
          rows={10}
          maxLength={30000}
          placeholder="가입인사는 작성 후 하루가 지나면&#13;&#10;가입인사 탭에만 보입니다."
          className=" w-full p-2 outline-none leading-5 resize-none relative"
          {...register("contents", { required: "내용을 입력해주세요." })}
        />
        <ErrorMessage
          errors={errors}
          name="contents"
          render={({ message }) => (
            <p className="text-[7px] text-red-500 inline-block absolute left-[25px] top-[170px]">
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
