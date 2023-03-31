import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import FloatButton from "@/components/FloatButton";
import ClubBoardNoticeList from "@/components/ClubBoardNoticeList";
import ClubBoardPostList from "@/components/ClubBoardPostList";

export default function ClubBoard({ isMember }: { isMember: boolean }) {
  const [category, setCategory] = useState("all");

  return (
    <>
      <div className="flex flex-col p-4">
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
          <ClubBoardNoticeList />
        </section>
        <section>
          <ClubBoardPostList category={category} />
        </section>
      </div>
      <div className="absolute bottom-8 right-8">
        {isMember && (
          <FloatButton to="write">
            <FontAwesomeIcon icon={faPlus} />
            <p className="text-sm">작성</p>
          </FloatButton>
        )}
      </div>
    </>
  );
}
