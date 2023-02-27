import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Overlay from "./Overlay";

export default function ClubBoard() {
  const [category, setCategory] = useState("all");
  const [inModal, setInModal] = useState(false);
  return (
    <>
      <div className="flex flex-col">
        <select
          onChange={(e) => setCategory(e.target.value)}
          name=""
          id=""
          className="w-32 mt-4 rounded-full p-1 border-black border"
        >
          <option value="all">전체보기</option>
          <option value="free">자유 글</option>
          <option value="share">관심사 공유</option>
          <option value="meeting">정모후기</option>
          <option value="greeting">가입인사</option>
          <option value="notice">공지사항</option>
        </select>
        <section>
          <ul className="flex flex-col divide-y-[1px] divide-gray-300 mt-4">
            <li className="flex space-x-2 py-2">
              <strong className="font-semibold text-blue-500">[필독]</strong>
              <p>공지사항 제목</p>
            </li>
            <li className="flex space-x-2 py-2">
              <strong className="font-semibold text-blue-500">[필독]</strong>
              <p>공지사항 제목</p>
            </li>
            <li className="flex space-x-2 py-2">
              <strong className="font-semibold text-blue-500">[필독]</strong>
              <p>공지사항 제목</p>
            </li>
          </ul>
        </section>
        <section>
          <ul className="flex flex-col divide-gray-200">
            {[0, 1, 2, 3].map((i) => (
              <li className="py-2 border-b-4 border-gray-200">
                <header className="flex justify-between items-center">
                  <div className="flex space-x-2 items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                    <span>이름</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400"> 2월 13일 오후 3:13</p>
                  </div>
                </header>
                <div className="h-24 py-2 border-b border-gray-300 flex justify-between items-start">
                  <p className="h-full">글 내용</p>
                  <div className="w-28 aspect-video bg-gray-500 rounded-lg"></div>
                </div>
                <div className="flex py-2 justify-between items-center">
                  <div className="flex space-x-4">
                    <div className="flex space-x-1 items-center">
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <p className="text-sm translate-y-[2px]">좋아요 1</p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <FontAwesomeIcon icon={faMessage} />
                      <p className="text-sm translate-y-[2px]">댓글 1</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm translate-y-[2px]">
                      가입인사
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="absolute w-16 h-16 rounded-full bg-blue-500 bottom-8 right-8 flex justify-center items-center z-10">
        <FontAwesomeIcon icon={faPlus} className="text-white" size="lg" />
      </div>
    </>
  );
}
