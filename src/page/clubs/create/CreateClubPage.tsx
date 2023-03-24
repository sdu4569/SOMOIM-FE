import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import InterestSelect from "@/components/InterestSelect";
import PageHeader from "@/components/PageHeader";
import RegionSelect from "@/components/RegionSearch";
import usePostRequest from "@/hooks/usePostRequest";
import { useNavigate } from "react-router-dom";

export interface CreateClubForm {
  area: string;
  name: string;
  description: string;
  memberLimit: number;
  favorite: "GAME" | "OUTDOOR" | "EXERCISE" | "HUMANITIES";
  imageUrl?: string;
}

enum ModalType {
  INTEREST = "interest",
  LOCATION = "location",
}

const interests = {
  "게임/오락": "GAME",
  "아웃도어/여행": "OUTDOOR",
  "운동/스포츠": "EXERCISE",
  "인문학/책/글": "HUMANITIES",
};

type InterestType = keyof typeof interests;

export default function CreateClub() {
  const { register, handleSubmit, setValue, watch } = useForm<CreateClubForm>({
    defaultValues: {
      imageUrl: "",
    },
  });

  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();

  const { mutate, isLoading } = usePostRequest("clubs", {
    authorized: true,
  });

  const navigate = useNavigate();

  const closeModal = () => {
    setInModal(false);
  };

  const onSubmit = async (data: CreateClubForm) => {
    console.log(data);

    // const response = await fetch(
    //   `https://api.cloudflare.com/client/v4/accounts/23f362ecd420755dd443b290ed1593f6/images/v2/direct_upload`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer YZRHJ5lk4rMlUg5JDlFD23Jgi-lbtw9DNPGv_P7S`,
    //     },
    //   }
    // );

    // const parsed = await response.json();

    // console.log(parsed);

    const result = await mutate(data);

    if (!result.ok) {
      alert("클럽 개설에 실패했습니다. 다시 시도해주세요.");
    } else {
      navigate(`/clubs/${result.data.id}`);
    }
  };

  return (
    <>
      {inModal &&
        modalType &&
        {
          location: (
            <RegionSelect
              setValue={setValue}
              closeModal={closeModal}
              title="클럽"
              inputId="area"
            />
          ),
          interest: (
            <div className="w-full h-full z-[200] absolute bg-white">
              <InterestSelect
                closeModal={closeModal}
                maxSelect={1}
                onComplete={(data) => {
                  setValue("favorite", "EXERCISE");
                  closeModal();
                }}
              />
            </div>
          ),
        }[modalType]}
      <div className="overflow-scroll h-full p-4">
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
            <label htmlFor="location" className="flex items-center">
              <div className="flex space-x-2 w-24 items-center">
                <FontAwesomeIcon icon={faLocation} />
                <p>지역</p>
              </div>
              <input
                onFocus={() => {
                  setInModal(true);
                  setModalType(ModalType.LOCATION);
                }}
                disabled={inModal}
                type="text"
                id="location"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                placeholder="동&middot;읍&middot;면 찾기"
                {...register("area")}
              />
            </label>
            <label htmlFor="interest" className="flex items-center">
              <div className="flex space-x-2 w-24 items-center">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <p>관심사</p>
              </div>
              <input
                onFocus={() => {
                  setInModal(true);
                  setModalType(ModalType.INTEREST);
                }}
                disabled={inModal}
                type="text"
                id="interest"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                placeholder="클럽 관심사 선택"
                {...register("favorite")}
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
              {...register("description")}
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
                  min: 25,
                  max: 300,
                })}
                defaultValue={300}
                type="number"
                className="p-2 none rounded-md bg-gray-100 outline-none w-16 appearance-none text-center"
              />
            </label>
            <Button type="submit" className="w-full">
              클럽 만들기
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
