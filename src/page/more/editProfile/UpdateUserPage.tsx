import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";

import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import useUser from "@/hooks/useUser";

import { AnimatePresence } from "framer-motion";
import EditRegion from "@/components/EditRegion";
import usePostRequest from "@/hooks/usePostRequest";
import useUploadImage from "@/hooks/useUploadImage";
import Avatar from "@/components/Avatar";
import Overlay from "@/components/Overlay";
import Spinner from "@/components/Spinner";

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
  avatar: FileList;
}

const UpdateUserPage = () => {
  const { user, loading } = useUser();
  const { mutate: updateUser, isLoading: updateLoading } = usePostRequest(
    "users",
    {
      authorized: true,
    }
  );
  const { uploadImage, isLoading: uploadImageLoading } = useUploadImage();
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const navigate = useNavigate();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<userFormData>();

  const formRef = useRef<HTMLFormElement>(null);
  const [inRegionModal, setInRegionModal] = useState<boolean>(false);
  const closeModal = () => setInRegionModal(false);

  const { ref } = register("avatar");
  const fileInput = useRef<HTMLInputElement | null>(null);

  // populate form with user data
  useEffect(() => {
    if (user) {
      setValue("area", user.area);
      setValue("gender", user.gender);
      setValue("name", user.name);
      setValue("introduction", user.introduction);
      setValue("birth", user.birth);

      user.profileUrl && setAvatarPreview(user.profileUrl + "/avatarLarge");
      // to do : avatar
    }
  }, [user]);

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  const handleDelete = () => {
    if (fileInput.current == null) return;

    fileInput.current.value = "";
    setAvatarPreview("");
  };

  const onSubmit = async (userForm: userFormData) => {
    let profileUrl = null;
    console.log(profileUrl);

    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      const result = await uploadImage(file);
      console.log(result);
      profileUrl = result || null;
    }
    const result = await updateUser({
      area: userForm.area,
      birth: userForm.birth,
      name: userForm.name,
      gender: userForm.gender,
      introduction: userForm.introduction,
      profileUrl,
    });
    // console.log(fileUrl);
    console.log(result);
    navigate("/more", {
      replace: true,
    });
  };

  return (
    <>
      {updateLoading ||
        (uploadImageLoading && (
          <Overlay>
            <Spinner size="lg" />
          </Overlay>
        ))}
      <AnimatePresence>
        {inRegionModal && (
          <EditRegion setInputValue={setValue} closeModal={closeModal} />
        )}
      </AnimatePresence>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="flex flex-col"
        >
          <div className="flex justify-center relative">
            <label
              htmlFor="file"
              className="inline-block w-20 aspect-square relative cursor-pointer"
            >
              <img
                src={avatarPreview ? avatarPreview : Images.user}
                alt="유저 이미지"
                className={`w-full aspect-square rounded-full bg-gray-200 ${
                  loading && "animate-pulse"
                }`}
                id="previewImage"
              />

              <img
                src={Images.camera}
                alt="유저 프로필 변경"
                className="w-6 rounded-full absolute bottom-0 right-0"
              />
              <input
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                {...register("avatar")}
                ref={(e) => {
                  ref(e);
                  fileInput.current = e;
                }}
              />
            </label>
            <div
              onClick={handleDelete}
              className={`text-[12px] absolute bottom-[40px] right-3 underline text-gray-400 cursor-pointer ${
                avatarPreview ? "" : "hidden"
              }`}
            >
              삭제
            </div>
          </div>
          <div className="mt-6 h-10 relative">
            <input
              type="text"
              className="inline-block w-[200px] h-10 pl-3 rounded-md bg-gray-100 mr-3 outline-none"
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
              <fieldset
                id="genderSelect"
                className="flex items-center justify-between rounded-md border h-full"
              >
                <label
                  htmlFor="MALE"
                  className={`flex justify-center items-center flex-1 h-full rounded-md ${
                    watch("gender") === "MALE" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <p>남</p>
                  <input
                    {...register("gender", { required: true })}
                    type="radio"
                    id="MALE"
                    name="gender"
                    value="MALE"
                    className="hidden"
                  />
                </label>
                <label
                  htmlFor="FEMALE"
                  className={`flex justify-center items-center flex-1 h-full rounded-md ${
                    watch("gender") === "FEMALE" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <p>여</p>
                  <input
                    {...register("gender", { required: true })}
                    type="radio"
                    id="FEMALE"
                    name="gender"
                    value="FEMALE"
                    className="hidden"
                  />
                </label>
              </fieldset>
            </div>
          </div>
          <div className="mt-6 h-10 relative">
            <input
              type="date"
              className="w-[150px] h-10 pl-3 mr-3 rounded-md bg-gray-100 outline-none"
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

            <img
              src={Images.location}
              alt="좌표"
              className="absolute w-4 top-3 left-[173px] z-20"
            />
            <input
              onFocus={() => setInRegionModal(true)}
              {...register("area", {
                required: true,
              })}
              type="text"
              disabled={inRegionModal}
              id="area"
              className="w-[200px] h-10 pl-7 rounded-md bg-gray-100 outline-none absolute right-0"
            />
          </div>
          <div className="relative">
            <textarea
              className="inline-block w-full mt-6 h-20 p-3 rounded-md bg-gray-100 overflow-hidden resize-none outline-none"
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
    </>
  );
};

export default UpdateUserPage;
