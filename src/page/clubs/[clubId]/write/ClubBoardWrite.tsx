import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";
import Overlay from "@/components/Overlay";
import usePostRequest from "@/hooks/usePostRequest";
import useSWR from "swr";
import useUploadImage from "@/hooks/useUploadImage";
import Spinner from "@/components/Spinner";

interface writeFormData {
  title: string;
  contents: string;
  category: string;
  image: FileList;
}

const textObject = {
  free: "자유 글",
  share: "관심사 공유",
  meeting: "정모후기",
  greeting: "가입인사",
  notice: "공지사항",
};
type categoryType = keyof typeof textObject;

export default function ClubBoardWrite() {
  const formRef = useRef<HTMLFormElement>(null);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [category, setCategory] = useState<categoryType>("free");
  const params = useParams();
  const navigate = useNavigate();

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<writeFormData>();

  const {
    uploadImage,
    isLoading: imageUploadLoading,
    error,
  } = useUploadImage();

  const { mutate: uploadPost, isLoading: uploadPostLoading } = usePostRequest(
    `clubs/${params.clubId}/boards`,
    { authorized: true }
  );

  const { ref } = register("contents");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!contentRef.current) return;

    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current?.scrollHeight + "px";
  }, [contentRef]);

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    setCategoryModal(true);
  }, []);

  useEffect(() => {
    // 이미지 미리보기
    if (watch("image")[0]) {
      const file = URL.createObjectURL(watch("image")[0]);
      const previewImage = document.querySelector(
        "#firstPreview"
      ) as HTMLInputElement;
      previewImage.src = file;
    }
  }, [watch("image")]);

  const onSubmit = async (writeForm: writeFormData) => {
    writeForm.category = category;
    console.log(writeForm);

    let imageUrl = null;

    if (writeForm.image[0]) {
      imageUrl = await uploadImage(writeForm.image[0]);
    }

    const result = await uploadPost({
      title: writeForm.title,
      content: writeForm.contents,
      category: "자유",
      imageUrl,
    });

    if (result.ok) {
      navigate("/clubs/" + params.clubId + "/post/" + result.data.id, {
        replace: true,
      });
    } else {
      alert(result.message);
    }
  };

  const handleClick = (e: any) => {
    setCategory(e.currentTarget.dataset.category);
    setCategoryModal(false);
  };

  return (
    <>
      {(imageUploadLoading || uploadPostLoading) && (
        <Overlay>
          <Spinner size="lg" />
        </Overlay>
      )}
      {categoryModal && (
        <Overlay onClick={() => setCategoryModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" w-full h-[300px] mt-auto mb-auto ml-3 mr-3 flex bg-white self-end flex-col"
          >
            <div className="h-[50px] p-4 text-[20px]">게시글 카테고리</div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category="free"
            >
              자유 글
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category="share"
            >
              관심사 공유
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category="meeting"
            >
              정모후기
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category="greeting"
            >
              가입인사
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category="notice"
            >
              공지사항
            </div>
          </div>
        </Overlay>
      )}
      <PageHeader>
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate ">게시글 작성</h1>
        </div>
        <button type="submit" className="text-xl" onClick={clickHandler}>
          완료
        </button>
      </PageHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="mt-12 ml-3 mr-3 flex flex-col"
      >
        <div className="flex border-y border-gray-200 items-center space-x-2 ">
          <input
            type="text"
            className="outline-none p-2 text-lg flex-1 relative"
            placeholder="제목 (40자)"
            {...register("title", { required: "제목을 입력해주세요." })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className="text-[14px] text-red-500 inline-block absolute left-[110px]">
                {message}
              </p>
            )}
          />
          <p
            className="text-blue-500 text-sm absolute right-4"
            {...register("category")}
          >
            {textObject[category]}
          </p>
        </div>
        <textarea
          cols={30}
          rows={10}
          maxLength={30000}
          placeholder="가입인사는 작성 후 하루가 지나면&#13;&#10;가입인사 탭에만 보입니다."
          className=" w-full p-2 outline-none leading-5 relative resize-none"
          {...register("contents", { required: "내용을 입력해주세요." })}
          onInput={handleResizeHeight}
          ref={(e) => {
            ref(e);
            contentRef.current = e;
          }}
        />
        <ErrorMessage
          errors={errors}
          name="contents"
          render={({ message }) => (
            <p className="text-[14px] text-red-500 inline-block absolute left-[20px] top-[150px]">
              {message}
            </p>
          )}
        />

        <div className="flex mt-2 justify-between">
          <div className="flex space-x-2 ">
            <label
              htmlFor="image"
              className="relative border rounded-md p-2 border-gray-300  w-[65px] h-[65px]"
            >
              <img
                src={Images.preview}
                alt="첫번째 미리보기"
                className="w-[49px] h-[49px] rounded-md"
                id="firstPreview"
              />
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden absolute file"
              {...register("image")}
            />
          </div>
          <p className="flex items-end text-gray-400">
            {watch("contents")?.length} / 30000자
          </p>
        </div>
      </form>
    </>
  );
}
