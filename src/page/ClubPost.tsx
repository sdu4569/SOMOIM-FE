import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import HeaderBackButton from "../components/HeaderBackButton";
import PageHeader from "../components/PageHeader";
import BottomTabNavigator from "../components/BottomTabNavigator";
import Button from "../components/Button";

export default function ClubPost() {
  const [like, setLike] = useState<boolean>(false);
  return (
    <>
      <PageHeader className="!bg-gray-300">
        <div className="flex space-x-2 items-center">
          <HeaderBackButton />
          <h1 className="text-lg ">게시글</h1>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </PageHeader>
      <section className="mt-10 mb-12 h-full overflow-scroll p-4">
        <header className="flex w-full items-center justify-between py-2">
          <div className="flex space-x-2 items-center">
            <div className="w-10 aspect-square rounded-full bg-blue-500"></div>
            <div className="flex flex-col h-full justify-between  text-sm">
              <div className="flex space-x-1">
                <p>포마</p>
                <p className="font-semibold text-blue-500">클럽장</p>
              </div>
              <p className="text-gray-500">3월 3일 오후 12시 57분</p>
            </div>
          </div>
          <div>
            <p className="text-blue-500">공지사항</p>
          </div>
        </header>
        <div className="pt-4 pb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          maiores? A temporibus rem voluptate ad cumque ea ipsum eius.
          Asperiores rem deleniti laudantium atque ad delectus dolores. Libero,
          sunt modi?
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLike((prev) => !prev)}
            className={`border rounded-md p-2 text-sm border-black flex justify-center space-x-1 items-center ${
              like ? "text-blue-500" : "text-black"
            }`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="-" />
            <p>좋아요</p>
          </button>
          <button className="border rounded-md p-2 text-sm border-black flex justify-center space-x-1 items-center">
            <FontAwesomeIcon icon={faComment} className="" />
            <p>댓글 달기</p>
          </button>
        </div>
        <div className="border-y border-gray-300 mt-4 flex justify-between items-center pl-2">
          <div className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faThumbsUp} className="-" />
            <p className="py-3 text-sm">제일 먼저 좋아요를 눌러주세요!</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm">댓글 1개</p>
          </div>
        </div>
        <section className="mt-4 h-full overflow-scroll">
          <ul>
            <li className="flex space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-500"></div>
              <div className="w-36 flex flex-col space-y-1">
                <div className="flex flex-col">
                  <p className="text-sm">닉네임</p>
                  <p className="text-xs text-gray-300">3월 2일 오후 3:43</p>
                </div>
                <p className="p-2 rounded-md bg-blue-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  incidunt obcaecati quas illum voluptatum dolores aut aperiam
                  eius quis. Nesciunt illo eum ex aperiam dolor voluptatum
                  adipisci officia commodi! Quidem.
                </p>
                <div className="text-sm text-gray-500 divide-black flex items-center">
                  <p className="pr-1">좋아요 3</p>
                  <div className="flex space-x-1 items-center pl-1">
                    <FontAwesomeIcon icon={faThumbsUp} className="-" />
                    <p className="">좋아요</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
      <BottomTabNavigator className="space-x-2 px-2">
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className="bg-gray-300 p-4 rounded-lg flex-1 outline-none"
        />
        <Button>전송</Button>
      </BottomTabNavigator>
    </>
  );
}
