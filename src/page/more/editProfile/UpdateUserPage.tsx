import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { API_ENDPOINT } from "@/App";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "@/libs/atoms";
import useUser from "@/hooks/useUser";

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export interface userFormData {
  area: string;
  birth: string;
  gender: string;
  introduction: string;
  name: string;
  profileUrl?: string;
}

const UpdateUserPage = () => {
  const { user, mutate } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const navigate = useNavigate();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<userFormData>();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // 이미지 미리보기
    function readImage(input: HTMLInputElement) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const previewImage = document.querySelector(
            "#previewImage"
          ) as HTMLInputElement;
          previewImage.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    const inputImage = document.querySelector("#file") as HTMLInputElement;
    inputImage.addEventListener("change", (e: any) => {
      readImage(e.target);
    });
  }, []);

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  const onSubmit = (userForm: userFormData) => {
    navigate(-1);
  };

  return (
    <div className="h-full py-16 p-4 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">내 프로필</h1>
        </div>

        <button type="submit" className="text-xl" onClick={clickHandler}>
          저장
        </button>
      </PageHeader>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="ml-1">
        <label htmlFor="file" className="inline-block w-14 h-14">
          <img
            src={Images.user}
            alt="유저 이미지"
            className="w-14 h-14 cursor-pointer rounded-full bg-gray-200"
            id="previewImage"
          />
          <img
            src={Images.camera}
            alt="유저 프로필 변경"
            className="w-5 cursor-pointer rounded-full relative top-[-20px] left-[36px] "
          />
        </label>
        <input
          type="image/*"
          id="file"
          className="hidden"
          {...register("profileUrl")}
        />
        <div className="mt-6 h-10 relative">
          <input
            type="text"
            className="inline-block w-[200px] h-10 pl-3 rounded-md bg-gray-200 mr-3"
            placeholder="이름"
            {...register("name", {
              required: "이름은 필수 기입사항입니다.",
              minLength: { value: 2, message: "이름은 최소 2자 이상입니다." },
              maxLength: {
                value: 10,
                message: "이름은 10자를 초과할 수 없습니다.",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="text-[7px] text-red-500 inline-block absolute -bottom-4 left-1">
                {message}
              </p>
            )}
          />

          <div className="inline-block w-[150px] absolute top-0 h-10 border-2 border-solid rounded-md border-gray-300">
            <div className="relative">
              <input
                type="radio"
                id="male"
                className="hidden"
                value="male"
                {...register("gender")}
              />

              <label
                htmlFor="male"
                className={`absolute top-2.5 left-7  ${
                  watch("gender") === "male" ? "text-black" : "text-gray-200"
                }`}
              >
                남
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="female"
                className="hidden"
                value="female"
                {...register("gender", { required: true })}
              />
              <label
                htmlFor="female"
                className={`absolute top-2.5 right-7  ${
                  watch("gender") === "female" ? "text-black" : "text-gray-200"
                }`}
              >
                여
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 h-10 relative">
          <input
            type="date"
            className="w-[150px] h-10 pl-3 mr-3 rounded-md bg-gray-200"
            {...register("birth", { required: "생일을 선택해주세요." })}
          />
          <ErrorMessage
            errors={errors}
            name="birth"
            render={({ message }) => (
              <p className="text-[7px] text-red-500 inline-block absolute -bottom-4 left-1">
                {message}
              </p>
            )}
          />
          <Link to={"/region"} className="relative">
            <img
              src={Images.location}
              alt="좌표"
              className="absolute w-4 top-1 left-3"
            />
            <input
              type="text"
              className="w-[200px] h-10 pl-8 rounded-md bg-gray-200"
              {...register("area")}
            />
          </Link>
        </div>
        <div className="relative">
          <textarea
            className="inline-block w-full mt-6 h-20 p-3 rounded-md bg-gray-200 overflow-hidden resize-none"
            placeholder="간략한 자기소개(학교,회사)&#13;&#10;한국대 경영학과 학생입니다."
            maxLength={40}
            {...register("introduction")}
          />
          <div className="absolute bottom-2 right-2 text-[12px] text-gray-400">
            {watch("introduction")?.length} / 40자
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;
