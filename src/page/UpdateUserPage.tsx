import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderBackButton from "../components/HeaderBackButton";
import { Images } from "../components/Images";
import PageHeader from "../components/PageHeader";

const UpdateUserPage = () => {
  const location = useLocation();
  const userInfo = location.state;
  const [gender, setGender] = useState(`${userInfo.gender}`);
  const [birthday, setBirthday] = useState(`${userInfo.birthday}`);
  const [userDescription, setUserDescription] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    function readImage(input: HTMLInputElement) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const previewImage = document.querySelector(
            "#previewImage"
          ) as HTMLInputElement;
          previewImage.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    const inputImage = document.querySelector("#file") as HTMLInputElement;
    inputImage.addEventListener("change", (e: any) => {
      readImage(e.target);
    });
  }, []);

  const handleClickRadioButton = (e: any) => {
    setGender(e.target.value);
  };

  const handleChange = (e: any) => {
    setBirthday(e.target.value);
  };

  const clickHandler = (e: any) => {
    e.preventDefault();

    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  const textareaChange = (e: any) => {
    setUserDescription(e.target.value);
  };

  return (
    <div className="h-full py-16 p-4 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">내 프로필</h1>
        </div>
        <button type="submit" className="text-xl" onClick={clickHandler}>
          저장
        </button>
      </PageHeader>
      <form method="post" ref={formRef} className="ml-1">
        <label htmlFor="file" className="button">
          <img
            src={userInfo.userImage}
            alt="유저 이미지"
            className="w-14 h-14 cursor-pointer rounded-full bg-gray-200"
            id="previewImage"
          ></img>
        </label>
        <input type="file" name="file" id="file" className="hidden" />
        <div className="mt-4 h-10 relative">
          <input
            type="text"
            className="inline-block w-200 h-10 pl-3 rounded-md bg-gray-200 mr-3"
            placeholder="이름"
            defaultValue={userInfo.userName}
          />
          <div className="inline-block w-150 absolute top-0 h-10 border-2 border-solid rounded-md border-gray-300">
            <div className="relative">
              <input
                type="radio"
                id="male"
                className="hidden peer"
                value="male"
                name="gender"
                onClick={handleClickRadioButton}
                checked={gender == "male"}
                readOnly
              />
              <label
                htmlFor="male"
                className="absolute top-2.5 left-7 text-gray-200 peer-checked:text-black"
              >
                남
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="female"
                className="hidden peer"
                value="female"
                name="gender"
                onClick={handleClickRadioButton}
                checked={gender == "female"}
                readOnly
              />
              <label
                htmlFor="female"
                className="absolute top-2.5 right-7 text-gray-200 peer-checked:text-black"
              >
                여
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4 h-10 relative">
          <input
            type="date"
            className="w-150 h-10 pl-3 mr-3 rounded-md bg-gray-200"
            value={birthday}
            onChange={handleChange}
          />
          <Link to={"/region"} className="relative">
            <img
              src={Images.location}
              alt="좌표"
              className="absolute w-4 top-1 left-3"
            />
            <input
              type="text"
              className="w-200 h-10 pl-8 rounded-md bg-gray-200"
              defaultValue={userInfo.city}
            />
          </Link>
        </div>
        <div className="relative">
          <textarea
            className="inline-block w-full mt-4 h-20 p-3 rounded-md bg-gray-200 overflow-hidden resize-none"
            placeholder="간략한 자기소개(학교,회사)&#13;&#10;한국대 경영학과 학생입니다."
            onChange={textareaChange}
            maxLength={39}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-12 text-gray-400">
            {userDescription.length} / 40자
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;
