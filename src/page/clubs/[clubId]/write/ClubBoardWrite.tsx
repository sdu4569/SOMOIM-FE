import { ErrorMessage } from "@hookform/error-message";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import Overlay from "@/components/Overlay";
import useMutation from "@/hooks/useMutation";
import useUploadImage from "@/hooks/useUploadImage";
import Spinner from "@/components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { PostCategory, Tabs } from "@/libs/types";
import getPostCategoryWithKey from "@/util/getPostCategoryWithKey";

interface writeFormData {
  title: string;
  content: string;
  category: PostCategory;
  image: FileList;
}

export default function ClubBoardWrite() {
  const formRef = useRef<HTMLFormElement>(null);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [category, setCategory] = useState<PostCategory>(PostCategory.FREE);
  const [preview, setPreview] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<writeFormData>();

  const postPicture = watch("image");

  const {
    uploadImage,
    isLoading: imageUploadLoading,
    error,
  } = useUploadImage();

  const { mutate: uploadPost, isLoading: uploadPostLoading } = useMutation(
    `clubs/${params.clubId}/boards`,
    { authorized: true }
  );

  const { ref } = register("content");
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
    if (postPicture && postPicture.length > 0) {
      const file = postPicture[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [postPicture]);

  useEffect(() => {
    setCategoryModal(true);
  }, []);

  const onSubmit = async (writeForm: writeFormData) => {
    writeForm.category = category;
    console.log(writeForm);

    let imageUrl = null;

    if (writeForm.image[0]) {
      imageUrl = await uploadImage(writeForm.image[0]);
    }

    const result = await uploadPost({
      title: writeForm.title,
      content: writeForm.content,
      category: writeForm.category,
      imageUrl,
    });

    if (result.ok) {
      navigate("/clubs/" + params.clubId + "/posts/" + result.data.id, {
        replace: true,
        state: {
          post: result.data,
        },
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
              data-category={PostCategory.ANNOUNCEMENT}
            >
              {getPostCategoryWithKey(PostCategory.ANNOUNCEMENT)}
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category={PostCategory.FREE}
            >
              {getPostCategoryWithKey(PostCategory.FREE)}
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category={PostCategory.FAVORITE}
            >
              {getPostCategoryWithKey(PostCategory.FAVORITE)}
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category={PostCategory.MEET}
            >
              {getPostCategoryWithKey(PostCategory.MEET)}
            </div>
            <div
              className="h-[50px] p-4 text-[16px]"
              onClick={(e) => handleClick(e)}
              data-category={PostCategory.JOIN}
            >
              {getPostCategoryWithKey(PostCategory.JOIN)}
            </div>
          </div>
        </Overlay>
      )}
      <PageHeader>
        <div className="flex space-x-4 items-center">
          <HeaderBackButton
            onClick={() =>
              navigate(`/clubs/${params.clubId}`, {
                state: {
                  prevTab: Tabs.BOARD,
                },
                replace: true,
              })
            }
          />
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
            {...register("title", {
              required: "제목을 입력해주세요.",
              maxLength: 40,
            })}
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
            onClick={() => setCategoryModal(true)}
            className="text-blue-500 text-sm"
            {...register("category")}
          >
            {getPostCategoryWithKey(category)}
          </p>
        </div>
        <textarea
          cols={30}
          rows={10}
          maxLength={30000}
          placeholder="클럽원들과 공유하고 싶은 내용을 적어보세요."
          className=" w-full p-2 outline-none leading-5 relative resize-none"
          {...register("content", { required: "내용을 입력해주세요." })}
          // onInput={handleResizeHeight}
          ref={(e) => {
            ref(e);
            contentRef.current = e;
          }}
        />
        <ErrorMessage
          errors={errors}
          name="content"
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
              className="relative border rounded-md p-2 border-gray-300 w-32 aspect-square flex justify-center items-center cursor-pointer"
            >
              {preview ? (
                <img src={preview} alt="이미지 미리보기" />
              ) : (
                <FontAwesomeIcon icon={faCamera} size="2x" />
              )}
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
            {watch("content")?.length} / 30000자
          </p>
        </div>
      </form>
    </>
  );
}
