import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FavoriteList } from "@/libs/FavoriteList";
import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import HeaderBackButton from "@/components/HeaderBackButton";
import useMutation from "@/hooks/useMutation";
import Overlay from "@/components/Overlay";
import Spinner from "@/components/Spinner";
import useUser from "@/hooks/useUser";

interface RegisterFavoriteProps {
  onComplete?: (data: FavoriteFormData) => void;
}

export interface FavoriteFormData {
  favorites: string[];
}

export default function RegisterFavorite({
  onComplete,
}: RegisterFavoriteProps) {
  const { register, handleSubmit, setValue, watch } =
    useForm<FavoriteFormData>();
  const { mutate } = useUser();

  const { mutate: updateFavorite, isLoading: updateLoading } = useMutation(
    "users/favorites",
    {
      authorized: true,
    }
  );
  const navigate = useNavigate();

  const onSubmit = async (favoriteForm: FavoriteFormData) => {
    if (!favoriteForm.favorites.length) {
      alert("적어도 한 개의 관심사를 선택해주세요.");
      return;
    }
    console.log(favoriteForm);
    const result = await updateFavorite({
      favorites: favoriteForm.favorites,
    });
    await mutate();
    navigate("/clubs");
  };

  useEffect(() => {
    const selectedFavorites = watch("favorites");

    if (selectedFavorites && selectedFavorites.length > 7) {
      alert("관심사는 최대 7개까지 선택할 수 있습니다.");
      setValue("favorites", selectedFavorites.slice(0, 7));
    }
  }, [watch("favorites")]);

  // to do : prevent direct accesss

  return (
    <>
      {updateLoading && (
        <Overlay>
          <Spinner size="lg" />
        </Overlay>
      )}
      <motion.div variants={pageSlideIn} initial="initial" animate="animate">
        <form
          className="pt-16 px-4"
          onSubmit={
            onComplete ? handleSubmit(onComplete) : handleSubmit(onSubmit)
          }
        >
          <PageHeader>
            <div className="flex items-center space-x-2">
              <HeaderBackButton />
              <h1 className="text-xl whitespace-nowrap truncate">
                관심사 선택
              </h1>
            </div>
            <button type="submit" className="text-xl">
              다음
            </button>
          </PageHeader>
          <div className="grid grid-cols-4 gap-x-2 gap-y-6">
            {FavoriteList.map((item, idx) => {
              return (
                <label
                  key={idx}
                  htmlFor={item.title}
                  className="flex flex-col justify-center items-center"
                >
                  <input
                    {...register("favorites", {
                      required: "적어도 한 개의 관심사를 선택해주세요.",
                    })}
                    type="checkbox"
                    id={item.title}
                    className="hidden"
                    value={item.favorite}
                  />
                  <img
                    src={item.image}
                    className={`border-2 border-solid rounded w-12 bg-gray-200 ${
                      watch("favorites") &&
                      watch("favorites").includes(item.favorite) &&
                      "border-blue-500"
                    }`}
                  />
                  <div className="text-[13px] mt-2">{item.title}</div>
                </label>
              );
            })}
          </div>
        </form>
      </motion.div>
    </>
  );
}
