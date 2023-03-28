import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import PageHeader from "./PageHeader";
import HeaderBackButton from "./HeaderBackButton";
import { InterestList } from "@/libs/InterestList";
import usePostRequest from "@/hooks/usePostRequest";

interface InterestSelectProps {
  closeModal: () => void;
  maxSelect: number;
}

export interface interestFormData {
  favorite: string[];
}

export default function InterestSelect({
  closeModal,
  maxSelect,
}: InterestSelectProps) {
  const { mutate: updateInterest, isLoading: updateLoading } = usePostRequest(
    "users/favorites",
    {
      authorized: true,
    }
  );

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<interestFormData>();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (errors.favorite) {
      alert(errors.favorite.message);
    }
  }, [errors.favorite]);

  useEffect(() => {
    const selectedInterests = watch("favorite");

    if (selectedInterests.length > maxSelect) {
      alert(`최대 ${maxSelect}개까지 선택해주세요.`);
      setValue("favorite", selectedInterests.slice(0, maxSelect));
    }
  }, [watch("favorite")]);

  const onSubmit = async (interestForm: interestFormData) => {
    const result = await updateInterest(interestForm);
    console.log(result);
    closeModal();
  };

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  return (
    <motion.div variants={pageSlideIn} initial="initial" animate="animate">
      <PageHeader>
        <div className="flex items-center space-x-2">
          <HeaderBackButton onClick={closeModal} />
          <h1 className="text-xl whitespace-nowrap truncate">관심사 선택</h1>
        </div>
        <button type="submit" className="text-xl" onClick={clickHandler}>
          저장
        </button>
      </PageHeader>
      <form
        className="pt-16 px-4"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {InterestList.map((item, idx) => {
            return (
              <label
                key={idx}
                htmlFor={item.title}
                className="flex flex-col justify-center items-center"
              >
                <input
                  {...register("favorite", {
                    required: "적어도 한 개의 관심사를 선택해주세요.",
                    maxLength: maxSelect,
                  })}
                  type="checkbox"
                  id={item.title}
                  className="hidden"
                  value={item.interest}
                />
                <img
                  src={item.image}
                  className={`border-2 border-solid rounded w-12 bg-gray-200 ${
                    watch("favorite") &&
                    watch("favorite").includes(item.interest) &&
                    "border-blue-500"
                  }`}
                />
                <div className="text-[12px] mt-2">{item.title}</div>
              </label>
            );
          })}
        </div>
      </form>
    </motion.div>
  );
}
