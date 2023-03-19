import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import { pageSlideIn } from "@/libs/variants";
import EditRegion from "@/components/EditRegion";

interface RegisterProfileFormData {
  name: string;
  gender: any;
  birthday: string;
  location: string;
}

export default function RegisterProfile() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterProfileFormData>({ shouldFocusError: false });
  const [selectedGender, setSelectedGender] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = (data: RegisterProfileFormData) => {
    console.log(data);
    // to do : edit profile api call
    navigate("/signup/interest");
  };
  const [inRegionModal, setInRegionModal] = useState<boolean>(false);
  const closeModal = () => setInRegionModal(false);

  // to do : prevent direct access

  return (
    <>
      <AnimatePresence>
        {inRegionModal && (
          <EditRegion setInputValue={setValue} closeModal={closeModal} />
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
                <p>이름</p>
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
                    htmlFor="male"
                    className={`flex justify-center items-center flex-1 h-full rounded-md ${
                      selectedGender === "male" ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <p>남</p>
                    <input
                      {...register("gender", { required: true })}
                      type="radio"
                      id="male"
                      name="gender"
                      value={"male"}
                      className="hidden"
                    />
                  </label>
                  <label
                    htmlFor="female"
                    className={`flex justify-center items-center flex-1 h-full rounded-md ${
                      selectedGender === "female"
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    <p>여</p>
                    <input
                      {...register("gender", { required: true })}
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      className="hidden"
                    />
                  </label>
                </fieldset>
              </label>
            </div>
            <div className="flex justify-between space-x-2">
              <label
                htmlFor="birthday"
                className="flex w-1/2 flex-col space-y-2"
              >
                <p>생일</p>
                <input
                  {...register("birthday", {
                    required: true,
                  })}
                  type="date"
                  id="birthday"
                  className="p-4 w-full h-full bg-gray-100 rounded-md outline-none"
                />
              </label>
              <label
                htmlFor="location"
                className="flex w-1/2 flex-col space-y-2"
              >
                <p>지역</p>
                <input
                  onFocus={() => setInRegionModal(true)}
                  {...register("location", {
                    required: true,
                  })}
                  type="text"
                  disabled={inRegionModal}
                  id="location"
                  className="p-4 w-full h-full bg-gray-100 rounded-md outline-none"
                />
              </label>
            </div>
            <Button className="w-full">다음</Button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
