import useSWR from "swr";
import SkeletonBar from "./SkeletonBar";
import Spinner from "./Spinner";

export default function ClubBoardNoticeList() {
  const { data: notices, isLoading: noticeLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
    {
      fetcher: (url: string) =>
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
    }
  );

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
      {notices.map((notice: any) => {
        return (
          <li key={notice.id} className="flex space-x-2 py-2">
            <strong className="font-semibold text-blue-500">[필독]</strong>
            <p>공지사항 제목</p>
          </li>
        );
      })}
    </ul>
  );
}
