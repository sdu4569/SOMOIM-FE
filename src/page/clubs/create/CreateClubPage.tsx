import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import FavoriteSelect from "@/components/FavoriteSelect";
import PageHeader from "@/components/PageHeader";
import RegionSelect from "@/components/RegionSearch";
import useMutation from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import { FavoriteList } from "@/libs/FavoriteList";

export interface CreateClubForm {
  area: string;
  name: string;
  description: string;
  memberLimit: number;
  favorite: string;
}

enum ModalType {
  FAVORITE = "favorite",
  AREA = "area",
}

export default function CreateClub() {
  const { register, handleSubmit, setValue, watch } = useForm<CreateClubForm>();

  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();

  const { mutate, isLoading } = useMutation("clubs", {
    authorized: true,
  });

  const navigate = useNavigate();

  const closeModal = () => {
    setInModal(false);
  };

  const onSubmit = async (data: CreateClubForm) => {
    console.log(data);

    const result = await mutate({
      ...data,
      favorite: FavoriteList.find(
        (favorite) => favorite.title === data.favorite
      )?.favorite,
    });

    if (!result.ok) {
      alert(result.message);
    } else {
      navigate(`/clubs/${result.data.id}`, { replace: true });
    }
  };

  return (
    <>
      {inModal &&
        modalType &&
        {
          area: (
            <RegionSelect
              setValue={setValue}
              closeModal={closeModal}
              title="클럽"
              inputId="area"
            />
          ),
          favorite: (
            <div className="w-full h-full z-[200] absolute bg-white">
              <FavoriteSelect
                closeModal={closeModal}
                maxSelect={1}
                setValue={setValue}
              />
            </div>
          ),
        }[modalType]}
      <motion.div
        variants={pageSlideIn}
        initial="initial"
        animate="animate"
        className="overflow-scroll h-full p-4"
      >
        <PageHeader>
          <div className="flex space-x-4 items-center">
            <HeaderBackButton />
            <h1>클럽 개설</h1>
          </div>
        </PageHeader>
        <section className="mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <label htmlFor="area" className="flex items-center">
              <div className="flex space-x-2 w-24 items-center">
                <FontAwesomeIcon icon={faLocation} />
                <p>지역</p>
              </div>
              <input
                onFocus={() => {
                  setInModal(true);
                  setModalType(ModalType.AREA);
                }}
                disabled={inModal}
                type="text"
                id="area"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                placeholder="동&middot;읍&middot;면 찾기"
                {...register("area", { required: true })}
              />
            </label>
            <label htmlFor="favorite" className="flex items-center">
              <div className="flex space-x-2 w-24 items-center">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <p>관심사</p>
              </div>
              <input
                onFocus={() => {
                  setInModal(true);
                  setModalType(ModalType.FAVORITE);
                }}
                disabled={inModal}
                type="text"
                id="favorite"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                placeholder="클럽 관심사 선택"
                {...register("favorite", { required: true })}
              />
            </label>
            <label htmlFor="clubName" className="flex items-center">
              <input
                type="text"
                id="clubName"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                placeholder="클럽 이름"
                {...register("name", {
                  required: "클럽 이름을 입력해주세요.",
                  maxLength: {
                    value: 30,
                    message: "클럽 이름은 30자 이내로 입력해주세요.",
                  },
                })}
              />
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="클럽 목표를 설명해주세요."
              cols={30}
              rows={8}
              className="rounded-md outline-none resize-none bg-gray-100 p-4 leading-4"
            ></textarea>
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} size="2xl" />
                <p>정원(25 ~ 300명)</p>
              </div>
              <input
                {...register("memberLimit", {
                  required: true,
                  min: 25,
                  max: 300,
                })}
                defaultValue={300}
                type="number"
                className="p-2 none rounded-md bg-gray-100 outline-none w-16 appearance-none text-center"
              />
            </label>
            <Button type="submit" className={`w-full`}>
              클럽 만들기
            </Button>
          </form>
        </section>
      </motion.div>
    </>
  );
}
