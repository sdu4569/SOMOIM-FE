import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface ClubBoardPostListProps {
  category: string;
}

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}`;
};

export default function ClubBoardPostList({
  category,
}: ClubBoardPostListProps) {
  const {
    data: posts,
    isLoading,
    isValidating,
    setSize,
  } = useSWRInfinite(getKey, {
    revalidateOnFocus: false,
    fetcher: (url: string) =>
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  const targetRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(targetRef, {});

  useEffect(() => {
    if (isIntersecting) {
      setSize((size) => size + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    setSize(1);
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <ul className="flex flex-col divide-gray-200 space-y-8 mt-4">
        {posts &&
          posts.flat().map((post) => (
            <Link
              to={`/clubs/1/post/${post.id}`}
              key={post.id}
              className="py-2 cursor-pointer"
            >
              <header className="flex justify-between items-center">
                <div className="flex space-x-2 items-center ">
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                  <span>이름</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400"> 2일 전</p>
                </div>
              </header>
              <div className="py-4 flex justify-between items-start">
                <div className="flex flex-col flex-1 space-y-2">
                  <p className="text-blue-500 pr-4 line-clamp-1">
                    {post.title}
                  </p>
                  <p className="flex-1 line-clamp-3 pr-4 leading-5">
                    {post.body}
                  </p>
                </div>
                <div className="w-28 aspect-video bg-gray-500 rounded-lg"></div>
              </div>
              <div className="flex py-2 justify-between items-center border-y-2 border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex space-x-1 items-center">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <p className="text-sm ">좋아요 {post.id}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <FontAwesomeIcon icon={faMessage} />
                    <p className="text-sm ">댓글 1</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm ">가입인사</p>
                </div>
              </div>
            </Link>
          ))}
      </ul>
      <div
        ref={targetRef}
        className={`w-full flex justify-center ${isIntersecting && "pt-2"}`}
      >
        {isValidating ? <Spinner size="md" /> : null}
      </div>
    </>
  );
}
