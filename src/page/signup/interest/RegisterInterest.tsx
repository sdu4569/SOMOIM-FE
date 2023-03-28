import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { InterestList } from "@/libs/InterestList";
import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import HeaderBackButton from "@/components/HeaderBackButton";
import usePostRequest from "@/hooks/usePostRequest";

interface RegisterInterestProps {
  onComplete?: (data: InterestFormData) => void;
}

export interface InterestFormData {
  favorite: string[];
}

export default function RegisterInterest({
  onComplete,
}: RegisterInterestProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InterestFormData>();

  const { mutate: updateInterest, isLoading: updateLoading } = usePostRequest(
    "users/favorite",
    {
      authorized: true,
    }
  );

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (interestForm: InterestFormData) => {
    const result = await updateInterest({
      favorite: interestForm.favorite[0],
    });
    console.log(result);
    navigate("/activity");
  };

  useEffect(() => {
    if (errors.favorite) {
      alert(errors.favorite.message);
    }
  }, [errors.favorite]);

  useEffect(() => {
    const selectedInterests = watch("favorite");

    if (selectedInterests && selectedInterests.length > 7) {
      alert("관심사는 최대 7개까지 선택할 수 있습니다.");
      setValue("favorite", selectedInterests.slice(0, 7));
    }
  }, [watch("favorite")]);

  useEffect(() => {
    console.log(location.state);
  }, []);

  // to do : prevent direct accesss

  return (
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
                  {...register("favorite", {
                    required: "적어도 한 개의 관심사를 선택해주세요.",
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
                <div className="text-[13px] mt-2">{item.title}</div>
              </label>
            );
          })}
        </div>
      </form>
    </motion.div>
  );
}
