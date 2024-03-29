import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import { pageSlideIn } from "@/libs/variants";

import useMutation from "@/hooks/useMutation";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/Spinner";
import RegionSearch from "@/components/RegionSearch";

interface RegisterProfileFormData {
  name: string;
  gender: string;
  birth: string;
  area: string;
}

export default function RegisterProfile() {
  const { user, loading, mutate: userMutate } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterProfileFormData>({ shouldFocusError: false });
  const [selectedGender, setSelectedGender] = useState<string>("");
  const { mutate: updateUser } = useMutation("users", { authorized: true });
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterProfileFormData) => {
    const updateResponse = await updateUser(data);

    if (updateResponse.ok) {
      await userMutate();
      navigate("/signup/favorite", {
        replace: true,
      });
    } else {
      alert(updateResponse.data.detail);
    }
  };
  const [inRegionModal, setInRegionModal] = useState<boolean>(false);
  const closeModal = () => setInRegionModal(false);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {inRegionModal && (
          <RegionSearch
            closeModal={closeModal}
            inputId="area"
            setValue={setValue}
            title=""
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={pageSlideIn}
        initial="initial"
        animate="animate"
        className="flex h-full w-full justify-center items-center"
      >
        <PageHeader>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg">프로필 등록</h1>
          </div>
        </PageHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex justify-center items-center w-full h-full p-4"
        >
          <div className="p-4 rounded-md border border-black w-full flex flex-col space-y-4">
            <div className="flex justify-between space-x-2">
              <label htmlFor="name" className="flex flex-1 flex-col space-y-2">
                <div className="flex space-x-2">
                  <p>이름</p>
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("name", {
                    required: "이름을 입력해주세요.",
                    maxLength: {
                      value: 10,
                      message: "이름은 10자 이하로 입력해주세요.",
                    },
                  })}
                  type="text"
                  id="name"
                  className="p-4 bg-gray-100 rounded-md outline-none"
                />
              </label>
              <label
                htmlFor="genderSelect"
                className="w-1/3 flex flex-col space-y-2"
              >
                <p>성별</p>
                <fieldset
                  onChange={() => setSelectedGender(watch("gender"))}
                  id="genderSelect"
                  className="flex items-center justify-between rounded-md border h-full"
                >
                  <label
                    htmlFor="MALE"
                    className={`flex justify-center items-center flex-1 h-full rounded-md ${
                      selectedGender === "MALE" ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <p>남</p>
                    <input
                      {...register("gender", { required: true })}
                      type="radio"
                      id="MALE"
                      name="gender"
                      value={"MALE"}
                      className="hidden"
                    />
                  </label>
                  <label
                    htmlFor="FEMALE"
                    className={`flex justify-center items-center flex-1 h-full rounded-md ${
                      selectedGender === "FEMALE"
                        ? "bg-blue-500 text-white"
                        : ""
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
              </label>
            </div>
            <div className="flex justify-between space-x-2">
              <label htmlFor="birth" className="flex w-1/2 flex-col space-y-2">
                <p>생일</p>
                <input
                  {...register("birth", {
                    required: true,
                  })}
                  type="date"
                  id="birth"
                  className="p-4 w-full h-full bg-gray-100 rounded-md outline-none"
                />
              </label>
              <label htmlFor="area" className="flex w-1/2 flex-col space-y-2">
                <p>지역</p>
                <input
                  onFocus={() => setInRegionModal(true)}
                  {...register("area", {
                    required: true,
                  })}
                  type="text"
                  disabled={inRegionModal}
                  id="area"
                  className="p-4 w-full h-full bg-gray-100 rounded-md outline-none"
                />
              </label>
            </div>
            <Button
              className={`w-full ${
                (!watch("name") ||
                  !watch("area") ||
                  !watch("birth") ||
                  !watch("gender")) &&
                "!bg-gray-300"
              }`}
            >
              다음
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
