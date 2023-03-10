import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderBackButton from "./HeaderBackButton";
import PageHeader from "./PageHeader";

export default function ClubBoardWrite() {
  return (
    <>
      <PageHeader className="">
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate ">게시글 작성</h1>
        </div>
        <div className="flex items-center">
          <p className="">완료</p>
        </div>
      </PageHeader>
      <section className="mt-12 flex flex-col">
        <div className="flex border-y border-gray-200 items-center space-x-2">
          <input
            type="text"
            className="outline-none p-2 text-lg flex-1"
            placeholder="제목 (40자)"
          />
          <p className="text-blue-500 text-sm">자유 글</p>
        </div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="가입인사는 작성 후 하루가 지나면&#13;&#10;가입인사 탭에만 보입니다."
          className="mt-2 w-full outline-none leading-5 resize-none"
        ></textarea>
        <div className="flex mt-2 justify-between">
          <div className="flex space-x-2">
            <label
              htmlFor="first"
              className="relative p-4 border rounded-md border-gray-300"
            >
              <FontAwesomeIcon icon={faCamera} size="2xl" />
              <input
                type="file"
                id="first"
                accept="image/*"
                className="invisible absolute"
              />
            </label>
            <label
              htmlFor="second"
              className="relative p-4 border rounded-md border-gray-300"
            >
              <FontAwesomeIcon icon={faCamera} size="2xl" />
              <input
                type="file"
                id="second"
                accept="image/*"
                className="invisible absolute"
              />
            </label>
            <label
              htmlFor="third"
              className="relative p-4 border rounded-md border-gray-300"
            >
              <FontAwesomeIcon icon={faCamera} size="2xl" />
              <input
                type="file"
                id="third"
                accept="image/*"
                className="invisible absolute"
              />
            </label>
          </div>
          <p className="flex items-end text-gray-400">0 / 30000자</p>
        </div>
      </section>
    </>
  );
}
