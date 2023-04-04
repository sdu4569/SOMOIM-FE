import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import PostSkeleton from "./PostSkeleton";
import useAccessToken from "@/hooks/useAccessToken";
import { Post, PostCategory } from "@/libs/types";
import getPostCategoryWithKey from "@/util/getPostCategoryWithKey";
import PostPreview from "./PostPreview";

interface ClubBoardPostListProps {
  category: PostCategory;
  isMember: boolean;
}

interface PostResponse {
  ok: boolean;
  data: {
    content: Post[];
  };
}

export default function ClubBoardPostList({
  category,
  isMember,
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
            .map((post: Post) =>
              isMember ? (
                <Link
                  to={`/clubs/${params.clubId}/post/${post?.id}`}
                  key={post.id}
                  className="py-2 cursor-pointer"
                  state={{ post }}
                >
                  <PostPreview post={post} />
                </Link>
              ) : (
                <li
                  onClick={() => alert("클럽에 가입해주세요.")}
                  className="py-2"
                  key={post.id}
                >
                  <PostPreview post={post} />
                </li>
              )
            )}
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
