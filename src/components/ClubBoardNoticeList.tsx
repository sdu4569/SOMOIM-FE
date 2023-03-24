import useSWR from "swr";
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
      <div className="w-full h-20 justify-center items-center flex">
        <Spinner size="sm" />
      </div>
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
