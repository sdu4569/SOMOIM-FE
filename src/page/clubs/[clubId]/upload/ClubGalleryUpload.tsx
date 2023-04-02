import HeaderBackButton from "@/components/HeaderBackButton";
import Overlay from "@/components/Overlay";
import PageHeader from "@/components/PageHeader";
import Spinner from "@/components/Spinner";
import useMutation from "@/hooks/useMutation";
import useUploadImage from "@/hooks/useUploadImage";
import { Tabs } from "@/libs/types";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ClubGalleryUpload() {
  const [fileList, setFileList] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { uploadImage, isLoading } = useUploadImage();
  const { clubId } = useParams();
  const { mutate: uploadGallery, isLoading: uploadGalleryLoading } =
    useMutation(`clubs/${clubId}/albums`, { authorized: true });

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fileList.length === 0)
      return alert("적어도 한 장의 사진을 업로드해주세요.");

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        const result = await uploadGallery({
          imageUrl,
        });
      }
    }

    navigate(-1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const index = Number(e.target.id);
    if (file) {
      setFileList((prev) => {
        const next = [...prev];
        next[index] = file;
        return next;
      });
    }
  };

  useEffect(() => {
    const previews = fileList.map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  }, [fileList]);

  return (
    <>
      {isLoading && (
        <Overlay>
          <Spinner size="lg" />
        </Overlay>
      )}
      <form onSubmit={onSubmit} className="pt-14 h-full overflow-scroll">
        <PageHeader>
          <div className="flex space-x-4 items-center">
            <HeaderBackButton
              onClick={() => {
                navigate(`/clubs/${clubId}`, {
                  state: {
                    prevTab: Tabs.PHOTO,
                  },
                  replace: true,
                });
              }}
            />
            <h1 className="text-xl">사진첩 업로드</h1>
          </div>
          <button type="submit" className="text-xl">
            완료
          </button>
        </PageHeader>
        <section className="p-4 flex flex-col">
          <p className="font-semibold text-gray-400 pb-4">
            사진은 한번에 5장까지 업로드할 수 있습니다.
          </p>
          <div className="flex flex-col space-y-4">
            {[0, 1, 2, 3, 4].slice(0, fileList.length + 1).map((i) => (
              <label key={i} htmlFor={i + ""} className="group cursor-pointer">
                {previews[i] ? (
                  <img
                    src={previews[i]}
                    alt=""
                    className="border-4 group-hover:border-blue-500 rounded-lg"
                  />
                ) : (
                  <div className="w-full aspect-video border-4 rounded-lg flex justify-center items-center group-hover:border-blue-500">
                    <FontAwesomeIcon
                      icon={faImage}
                      size="3x"
                      className="text-gray-300 group-hover:text-blue-500"
                    />
                  </div>
                )}
                <input
                  id={i + ""}
                  onChange={onChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </section>
      </form>
    </>
  );
}
