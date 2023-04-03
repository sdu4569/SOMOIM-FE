import useAccessToken from "@/hooks/useAccessToken";
import { PostCategory } from "@/libs/types";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import SkeletonBar from "./SkeletonBar";

export default function ClubBoardNoticeList() {
  const params = useParams();
  const token = useAccessToken();

  const { data: notices, isLoading: noticeLoading } = useSWR([
    `clubs/${params.clubId}/boards/category?category=${PostCategory.FAVORITE}`,
    token,
  ]);

  if (noticeLoading) {
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

  return (
    <ul className="flex flex-col divide-y-[1px] divide-gray-300 mt-2">
      {notices.data.map((notice: any) => {
        return (
          <li key={notice.id} className="flex space-x-2 py-2">
            <strong className="font-semibold text-blue-500">[필독]</strong>
            <p>{notice.title}</p>
          </li>
        );
      })}
    </ul>
  );
}
