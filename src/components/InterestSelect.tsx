import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import PageHeader from "./PageHeader";
import HeaderBackButton from "./HeaderBackButton";
import { InterestList } from "@/libs/InterestList";

interface InterestSelectProps {
  onComplete: (data: InterestFormData) => void;
  closeModal: () => void;
  maxSelect: number;
}

export interface InterestFormData {
  selectedInterests: string[];
}

export default function InterestSelect({
  onComplete,
  closeModal,
  maxSelect,
}: InterestSelectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InterestFormData>();

  useEffect(() => {
    if (errors.selectedInterests) {
      alert(errors.selectedInterests.message);
    }
  }, [errors.selectedInterests]);

  useEffect(() => {
    const selectedInterests = watch("selectedInterests");

    if (selectedInterests && selectedInterests.length > maxSelect) {
      alert(`최대 ${maxSelect}개까지 선택해주세요.`);
      setValue("selectedInterests", selectedInterests.slice(0, maxSelect));
    }
  }, [watch("selectedInterests")]);

  return (
    <motion.div variants={pageSlideIn} initial="initial" animate="animate">
      <form className="pt-16 px-4" onSubmit={handleSubmit(onComplete)}>
        <PageHeader>
          <div className="flex items-center space-x-2">
            <HeaderBackButton onClick={closeModal} />
            <h1 className="text-xl whitespace-nowrap truncate">관심사 선택</h1>
          </div>
          <button type="submit" className="text-xl">
            다음
          </button>
        </PageHeader>
        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {InterestList.map((item, idx) => {
            return (
              <label
                key={idx}
                htmlFor={item.title}
                className="flex flex-col justify-center items-center"
              >
                <input
                  {...register("selectedInterests", {
                    required: "적어도 한 개의 관심사를 선택해주세요.",
                  })}
                  type="checkbox"
                  id={item.title}
                  className="hidden"
                  value={item.title}
                />
                <img
                  src={item.image}
                  className={`border-2 border-solid rounded w-12 bg-gray-200 ${
                    watch("selectedInterests") &&
                    watch("selectedInterests").includes(item.title) &&
                    "border-blue-500"
                  }`}
                />
                <div className="text-12 mt-2">{item.title}</div>
              </label>
            );
          })}
        </div>
      </form>
    </motion.div>
  );
}
