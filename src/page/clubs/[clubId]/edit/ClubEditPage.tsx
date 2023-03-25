import { faImage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHashtag, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";

interface ClubEditForm {
  category: string;
  area: string;
  banner?: FileList;
  clubName: string;
  description: string;
  maxMember: number;
}

export default function ClubEditPage() {
  const { register, handleSubmit, watch } = useForm<ClubEditForm>();
  const banner = watch("banner");
  const [bannerPreview, setBannerPreview] = useState("");

  useEffect(() => {
    if (banner && banner.length > 0) {
      const file = banner[0];
      console.log(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  }, [banner]);

  return (
    <div className="overflow-scroll h-full p-4">
      <PageHeader className="!bg-gray-100">
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1>클럽 수정</h1>
        </div>
      </PageHeader>
      <section className="mt-12">
        <form action="" className="flex flex-col space-y-4">
          <label htmlFor="category" className="flex items-center">
            <div className="flex space-x-2 w-28">
              <FontAwesomeIcon icon={faHashtag} />
              <p>상세 관심사</p>
            </div>
            <input
              type="text"
              id="category"
              className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
              {...register("category")}
            />
          </label>
          <label htmlFor="area" className="flex items-center">
            <div className="flex space-x-2 w-28">
              <FontAwesomeIcon icon={faLocation} />
              <p>중심지역</p>
            </div>
            <input
              type="text"
              id="area"
              className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
              {...register("area")}
            />
          </label>
          <label
            htmlFor="banner"
            className="cursor-pointer overflow-hidden flex flex-col space-y-2 relative items-center justify-center w-4/5 aspect-twenty-nine rounded-md border border-blue-500 text-blue-500"
          >
            {bannerPreview ? (
              <img src={bannerPreview} alt="" className="flex-1 object-cover" />
            ) : (
              <>
                <FontAwesomeIcon icon={faImage} size="2x" />
                <p className="text-sm">우리 클럽의 사진을 올려보세요.</p>
                <p className="absolute bottom-2 right-2 text-xs">비율 20:9</p>
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
          <label htmlFor="clubName" className="flex space-x-4 items-center">
            <div className="flex">
              <p>클럽명</p>
            </div>
            <input
              type="text"
              id="clubName"
              placeholder="클럽명을 입력해주세요."
              className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
              {...register("clubName")}
            />
          </label>
          <textarea
            id=""
            cols={30}
            rows={8}
            placeholder="클럽 소개글을 작성해주세요."
            className="resize-none outline-none bg-gray-100 rounded-md p-4"
            {...register("description")}
          ></textarea>
          <label className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} size="2xl" />
              <p>정원(300 ~ 300명)</p>
            </div>
            <input
              defaultValue={300}
              type="number"
              className="p-2 none rounded-md bg-gray-100 outline-none w-16 appearance-none text-center"
            />
          </label>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-400">클럽개설일 : 2023/2/27</p>
            <Button className="w-full">수정하기</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
