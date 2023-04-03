import { useRef, useState } from "react";

import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import PageHeader from "./PageHeader";
import HeaderBackButton from "./HeaderBackButton";
import { FavoriteList } from "@/libs/FavoriteList";
import useMutation from "@/hooks/useMutation";
import useUser from "@/hooks/useUser";
import getFavoriteWithKey from "@/util/getFavoriteWithKey";

interface FavoriteSelectProps {
  closeModal: () => void;
  maxSelect: number;
  setValue?: any;
}

export default function FavoriteSelect({
  closeModal,
  maxSelect,
  setValue,
}: FavoriteSelectProps) {
  const { user, mutate: mutateUser } = useUser();
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);
  const { mutate: updateFavorite, isLoading: updateLoading } = useMutation(
    "users/favorites",
    {
      authorized: true,
    }
  );

  const formRef = useRef<HTMLFormElement>(null);

  const changeFavoriteFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const targetValue = event.target.value;
    // 선택된 항목 추가
    if (event.target.checked) {
      if (selectedFavorites.length < maxSelect) {
        setSelectedFavorites([...selectedFavorites, targetValue]);
      } else {
        alert(`최대 ${maxSelect}개까지 선택해주세요.`);
      }
    } else {
      // 7개 이상일 때 추가된 항목 제외
      setSelectedFavorites(
        selectedFavorites.filter((Favorite) => Favorite !== targetValue)
      );
    }
  };

  const onSubmit = async () => {
    if (selectedFavorites.length == 0) {
      alert("최소 1개의 관심사를 선택해주세요");
      return;
    }

    if (setValue) {
      setValue("favorite", getFavoriteWithKey(selectedFavorites[0]));
    } else {
      const result = await updateFavorite({
        favorites: selectedFavorites,
      });

      if (result.ok && user) {
        await mutateUser({
          ok: true,
          data: { ...user, favorites: selectedFavorites },
        });
      }
      console.log(result);
    }
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
          {FavoriteList.map((item, idx) => {
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
                  value={item.favorite}
                  onChange={changeFavoriteFunction}
                  checked={selectedFavorites.includes(item.favorite)}
                />
                <img
                  src={item.image}
                  className={`border-2 border-solid rounded w-12 bg-gray-200 ${
                    selectedFavorites.includes(item.favorite) &&
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
