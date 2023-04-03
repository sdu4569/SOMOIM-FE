import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import PostSkeleton from "./PostSkeleton";
import useAccessToken from "@/hooks/useAccessToken";
import { Post, PostCategory } from "@/libs/types";
import getPostCategoryWithKey from "@/util/getPostCategoryWithKey";
import formatDate from "@/util/formatDate";
import Avatar from "./Avatar";

interface ClubBoardPostListProps {
  category: PostCategory;
}

interface PostResponse {
  ok: boolean;
  data: {
    content: Post[];
  };
}

export default function ClubBoardPostList({
  category,
}: ClubBoardPostListProps) {
  const params = useParams();
  const token = useAccessToken();
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  const getPostKey: SWRInfiniteKeyLoader = useCallback(
    (pageIndex, previousPageData) => {
      if (!token) return null;
      if (previousPageData && previousPageData.data?.content?.length === 0)
        return null;

      if (category === PostCategory.ALL) {
        return [`clubs/${params.clubId}/boards/_page=${pageIndex}`, token];
      }

      return [
        `clubs/${params.clubId}/boards/category/_page=${pageIndex}?category=${category}`,
        token,
      ];
    },
    [category, params.clubId, token]
  );
  const { data, isLoading, isValidating, setSize } =
    useSWRInfinite<PostResponse>(getPostKey);

  const targetRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(targetRef, {});

  useEffect(() => {
    if (isIntersecting) {
      setSize((size) => size + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    setSize(0);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
    } else {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  }, [isLoading]);

  if (showSkeleton) {
    return (
      <ul className="flex flex-col space-y-8 mt-4">
        {[1, 2, 3, 4, 5, 6].map((e) => {
          return <PostSkeleton key={e} />;
        })}
      </ul>
    );
  }

  if (data && data[0]?.data?.content.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400 text-lg">
          {getPostCategoryWithKey(category) === "전체 글"
            ? "첫 번째 게시글을 등록해보세요!"
            : `${getPostCategoryWithKey(
                category
              )}에 해당하는 게시글이 없습니다.`}
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="flex flex-col divide-gray-200 space-y-8 mt-4">
        {data &&
          data
            .map((e) => e.data.content)
            .flat()
            .map((post: Post) => (
              <Link
                to={`/clubs/${params.clubId}/post/${post?.id}`}
                key={post?.id}
                className="py-2 cursor-pointer"
                state={{ post }}
              >
                <header className="flex justify-between items-center">
                  <div className="flex space-x-2 items-center ">
                    <div className="w-8 h-8 rounded-full bg-gray-500">
                      <Avatar src={post.userImg} size="md" />
                    </div>
                    <span>{post.userName}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </header>
                <div className="py-4 flex justify-between items-start">
                  <div className="flex flex-col flex-1 space-y-2">
                    <p className="text-blue-500 pr-4 w-60 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {post?.title}
                    </p>
                    <p className="flex-1 w-60 line-clamp-3 pr-4 leading-5">
                      {post?.content}
                    </p>
                  </div>
                  {post?.imageUrl && (
                    <img
                      src={post.imageUrl + "/public"}
                      alt=""
                      className="rounded-md max-w-[110px] max-h-[150px]"
                    />
                  )}
                </div>
                <div className="flex py-2 justify-between items-center border-y-2 border-gray-200">
                  <div className="flex space-x-4">
                    <div className="flex space-x-1 items-center">
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <p className="text-sm ">좋아요 {post.likeCnt}</p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <FontAwesomeIcon icon={faMessage} />
                      <p className="text-sm ">댓글 {post.commentCnt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm ">
                      {getPostCategoryWithKey(post.category)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </ul>
      <div
        ref={targetRef}
        className={`w-full flex justify-center ${isIntersecting && "pt-2"}`}
      >
        {isValidating && <Spinner size="md" />}
      </div>
    </>
  );
}
