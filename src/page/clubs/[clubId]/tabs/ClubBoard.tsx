import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import FloatButton from "@/components/FloatButton";
import ClubBoardNoticeList from "@/components/ClubBoardNoticeList";
import ClubBoardPostList from "@/components/ClubBoardPostList";
import { PostCategory } from "@/libs/types";
import postcss from "postcss";

export default function ClubBoard({ isMember }: { isMember: boolean }) {
  const [category, setCategory] = useState<PostCategory>(PostCategory.ALL);

  return (
    <>
      <div className="flex flex-col p-4 h-full">
        <select
          onChange={(e) => setCategory(e.target.value as PostCategory)}
          name=""
          id=""
          className="w-32 mt-4 rounded-full p-1 border-black border focus:outline-none"
        >
          <option value={PostCategory.ALL}>전체보기</option>
          <option value={PostCategory.FREE}>자유 글</option>
          <option value={PostCategory.FAVORITE}>관심사 공유</option>
          <option value={PostCategory.MEET}>정모후기</option>
          <option value={PostCategory.JOIN}>가입인사</option>
        </select>
        <section>
          <ClubBoardNoticeList />
        </section>
        <section className="h-full">
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
