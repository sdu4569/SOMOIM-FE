import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import PageHeader from "./PageHeader";
import HeaderBackButton from "./HeaderBackButton";
import { InterestList } from "@/libs/InterestList";
import usePostRequest from "@/hooks/usePostRequest";
import useUser from "@/hooks/useUser";

interface InterestSelectProps {
  closeModal: () => void;
  maxSelect: number;
}

export default function InterestSelect({
  closeModal,
  maxSelect,
}: InterestSelectProps) {
  const { user, mutate: mutateUser } = useUser();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { mutate: updateInterest, isLoading: updateLoading } = usePostRequest(
    "users/favorites",
    {
      authorized: true,
    }
  );

  const formRef = useRef<HTMLFormElement>(null);

  const changeInterestFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const targetValue = event.target.value;
    // 선택된 항목 추가
    if (event.target.checked) {
      if (selectedInterests.length < 7) {
        setSelectedInterests([...selectedInterests, targetValue]);
      } else {
        alert(`최대 ${maxSelect}개까지 선택해주세요.`);
      }
    } else {
      // 7개 이상일 때 추가된 항목 제외
      setSelectedInterests(
        selectedInterests.filter((interest) => interest !== targetValue)
      );
    }
  };

  const onSubmit = async () => {
    if (selectedInterests.length == 0) {
      alert("최소 1개의 관심사를 선택해주세요");
      return;
    }
    const result = await updateInterest({
      favorites: selectedInterests,
    });

    if (result.ok && user) {
      mutateUser({ ok: true, data: { ...user, favorites: selectedInterests } });
    }
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
      <form className="pt-16 px-4" onSubmit={onSubmit} ref={formRef}>
        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {InterestList.map((item, idx) => {
            return (
              <label
                key={idx}
                htmlFor={item.title}
                className="flex flex-col justify-center items-center"
              >
                <input
                  type="checkbox"
                  id={item.title}
                  className="hidden"
                  value={item.interest}
                  onChange={changeInterestFunction}
                  checked={selectedInterests.includes(item.interest)}
                />
                <img
                  src={item.image}
                  className={`border-2 border-solid rounded w-12 bg-gray-200 ${
                    selectedInterests.includes(item.interest) &&
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
