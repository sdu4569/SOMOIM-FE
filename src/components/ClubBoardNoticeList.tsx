import useAccessToken from "@/hooks/useAccessToken";
import { Post, PostCategory } from "@/libs/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import SkeletonBar from "./SkeletonBar";

export default function ClubBoardNoticeList() {
  const params = useParams();
  const token = useAccessToken();
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  const { data: notices, isLoading: noticeLoading } = useSWR([
    `clubs/${params.clubId}/boards/category?category=${PostCategory.ANNOUNCEMENT}`,
    token,
  ]);

  useEffect(() => {
    if (noticeLoading) {
      setShowSkeleton(true);
    } else {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  }, [noticeLoading]);

  if (showSkeleton) {
    return (
      <ul className="flex flex-col divide-y-[1px] divide-gray-300 mt-2">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex space-x-2 py-2">
            <SkeletonBar className="w-10" />
            <SkeletonBar className="w-60" />
          </li>
        ))}
      </ul>
    );
  }

  if (notices?.data?.length === 0) {
    return (
      <div className="py-4">
        <p className="font-semibold text-lg text-center text-gray-300">
          공지사항이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y-[1px] divide-gray-300 mt-2">
      {notices?.data?.map((notice: Post) => {
        return (
          <li key={notice.id}>
            <Link
              to={`post/${notice.id}`}
              state={{ post: notice }}
              className="flex space-x-2 py-2"
            >
              <strong className="font-semibold text-blue-500">[필독]</strong>
              <p>{notice.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
