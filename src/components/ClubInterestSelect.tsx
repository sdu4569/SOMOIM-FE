import { useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PageHeader from "./PageHeader";
import HeaderBackButton from "./HeaderBackButton";
import { InterestList } from "@/libs/InterestList";
import getInterestWithKey from "@/util/getInterestWithKey";

interface ClubInterestSelectProps {
  readonly closeModal: () => void;
  readonly setInputValue: any;
  readonly prev: string;
}

interface Favorite {
  readonly favorite: string;
}

export default function ClubInterestSelect({
  closeModal,
  setInputValue,
  prev,
}: ClubInterestSelectProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, register, watch } = useForm<Favorite>({
    defaultValues: {
      favorite: prev,
    },
  });

  const onSubmit = (data: Favorite) => {
    setInputValue("favorite", getInterestWithKey(data.favorite));
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
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", ease: "easeInOut" }}
      className="absolute h-full w-full bg-white z-[100]"
    >
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
                  {...register("favorite", { required: true })}
                  type="radio"
                  id={item.title}
                  className="hidden"
                  value={item.interest}
                />
                <img
                  src={item.image}
                  className={`border-2 border-solid rounded w-12 bg-gray-200 ${
                    watch("favorite") === item.interest && "border-blue-500"
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
