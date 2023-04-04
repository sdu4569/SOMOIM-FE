import { faImage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHashtag, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getFavoriteWithKey from "@/util/getFavoriteWithKey";
import Spinner from "@/components/Spinner";
import ClubFavoriteSelect from "@/components/ClubFavoriteSelect";
import RegionSearch from "@/components/RegionSearch";
import useMutation from "@/hooks/useMutation";
import useUploadImage from "@/hooks/useUploadImage";
import Overlay from "@/components/Overlay";
import { FavoriteList } from "@/libs/FavoriteList";
import { mutate } from "swr";
import formatImageUrl from "@/util/formatImageUrl";

interface ClubEditForm {
  favorite: string;
  area: string;
  banner?: FileList;
  clubName: string;
  description: string;
  memberLimit: number;
}

const ModalTypes = {
  Region: "Region",
  Favorite: "Favorite",
} as const;

type ModalType = typeof ModalTypes[keyof typeof ModalTypes];

export default function ClubEditPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm<ClubEditForm>();
  const banner = watch("banner");
  const [bannerPreview, setBannerPreview] = useState("");
  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("Region");
  const { mutate: editClub, isLoading: editClubLoading } = useMutation(
    `clubs/${location.state.club.id}`,
    {
      authorized: true,
      method: "PATCH",
    }
  );
  const { uploadImage, isLoading: uploadImageLoading } = useUploadImage();
  const closeModal = () => setInModal(false);

  const onSubmit = async (data: ClubEditForm) => {
    console.log(data);
    if (editClubLoading) {
      return;
    }

    let imageUrl = null;

    if (banner && banner.length > 0) {
      const file = banner[0];
      imageUrl = await uploadImage(file);
    }

    const response = await editClub({
      name: data.clubName,
      description: data.description,
      imageUrl: imageUrl ? imageUrl : location.state.club.imageUrl,
      area: data.area,
      memberLimit: data.memberLimit,
      favorite: FavoriteList.find((f) => f.title === data.favorite)!.favorite,
    });

    if (response.ok) {
      await mutate(`clubs/${location.state.club.id}`, response);
      navigate(-1);
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (location && !location.state?.club) {
      alert("잘못된 접근입니다.");
      return navigate(-1);
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.club) {
      setValue("favorite", getFavoriteWithKey(location.state.club.favorite));
      setValue("area", location.state.club.area);
      setValue("clubName", location.state.club.name);
      setValue("description", location.state.club.description);
      setValue("memberLimit", location.state.club.memberLimit);
    }
  }, [location.state]);

  useEffect(() => {
    if (banner && banner.length > 0) {
      const file = banner[0];
      setBannerPreview(URL.createObjectURL(file));
    }
  }, [banner]);

  if (!location.state?.club) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {(editClubLoading || uploadImageLoading) && (
        <Overlay>
          <Spinner size="lg" />
        </Overlay>
      )}
      {inModal &&
        {
          Region: (
            <RegionSearch
              closeModal={closeModal}
              title="클럽"
              inputId="area"
              setValue={setValue}
            />
          ),
          Favorite: (
            <ClubFavoriteSelect
              prev={location.state.club.favorite}
              closeModal={closeModal}
              setInputValue={setValue}
            />
          ),
        }[modalType]}
      <div className="overflow-scroll h-full p-4">
        <PageHeader className="!bg-gray-100">
          <div className="flex space-x-4 items-center">
            <HeaderBackButton />
            <h1>클럽 수정</h1>
          </div>
        </PageHeader>
        <section className="mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <label htmlFor="favorite" className="flex items-center">
              <div className="flex space-x-2 w-28">
                <FontAwesomeIcon icon={faHashtag} />
                <p>관심사</p>
              </div>
              <input
                onFocus={(e) => {
                  e.target.blur();
                  setInModal(true);
                  setModalType("Favorite");
                }}
                type="text"
                id="favorite"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                {...register("favorite", { required: true })}
              />
            </label>
            <label htmlFor="area" className="flex items-center">
              <div className="flex space-x-2 w-28">
                <FontAwesomeIcon icon={faLocation} />
                <p>지역</p>
              </div>
              <input
                onFocus={(e) => {
                  e.target.blur();
                  setInModal(true);
                  setModalType("Region");
                }}
                type="text"
                id="area"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                {...register("area", { required: true })}
              />
            </label>
            <div className="flex justify-center">
              <label
                htmlFor="banner"
                className="cursor-pointer overflow-hidden flex flex-col space-y-2 relative items-center justify-center w-full aspect-twenty-nine rounded-md border border-blue-500 text-blue-500"
              >
                {bannerPreview || location.state?.club?.imageUrl ? (
                  <img
                    src={
                      bannerPreview ||
                      formatImageUrl(location.state.club.imageUrl, "public")
                    }
                    alt="클럽 배너 이미지"
                    className="flex-1 object-cover"
                  />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faImage} size="2x" />
                    <p className="text-sm">우리 클럽의 사진을 올려보세요.</p>
                    <p className="absolute bottom-2 right-2 text-xs">
                      비율 20:9
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="banner"
                  className="hidden"
                  {...register("banner")}
                />
              </label>
            </div>
            <label htmlFor="clubName" className="flex space-x-4 items-center">
              <div className="flex">
                <p>클럽명</p>
              </div>
              <input
                type="text"
                id="clubName"
                placeholder="클럽명을 입력해주세요."
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                {...register("clubName", { required: true })}
              />
            </label>
            <textarea
              id=""
              cols={30}
              rows={8}
              placeholder="클럽 소개글을 작성해주세요."
              className="resize-none outline-none bg-gray-100 rounded-md p-4"
              {...register("description", { required: true })}
            ></textarea>
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} size="2xl" />
                <p>정원(20 ~ 300명)</p>
              </div>
              <input
                {...register("memberLimit", {
                  required: true,
                  max: 300,
                  min: 20,
                })}
                type="number"
                className="p-2 none rounded-md bg-gray-100 outline-none w-16 appearance-none text-center"
              />
            </label>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-400">
                클럽개설일 : {location.state?.club?.createdAt.substring(0, 10)}
              </p>
              <Button className="w-full">수정하기</Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
