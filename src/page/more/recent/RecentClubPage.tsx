import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import getInterestWithKey from "@/util/getInterestWithKey";

const RecentClubPage = () => {
  const [recentClubList, setRecentClubList] = useState<any[]>([]);

  const getData = localStorage.getItem("recentClub");
  useEffect(() => {
    if (getData !== null) {
      const parseData = JSON.parse(getData);
      setRecentClubList(parseData);
    }
  }, []);
  console.log(recentClubList);
  const handleDelete = (e: string) => {
    const updateRecentList = recentClubList.filter(
      (item) => item.id !== Number(e)
    );
    setRecentClubList(updateRecentList);
    localStorage.setItem("recentClub", JSON.stringify(updateRecentList));
  };
  return (
    <div className="h-full py-16 px-4 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">최근 본 클럽</h1>
        </div>
      </PageHeader>
      <div>
        {recentClubList.map((item, idx) => {
          return (
            <div className="relative" key={idx}>
              <Link to={`/clubs/${item.id}`}>
                <div className="relative mt-6 h-12">
                  <img
                    src={item.imageUrl}
                    alt="클럽 이미지"
                    className={`w-12 h-12 rounded-2xl inline-block ${
                      item.imageUrl === ""
                        ? "border-dashed border-2 border-gray-500"
                        : ""
                    } `}
                  />
                  <div className="text-[12px] absolute top-0 left-16">
                    {item.name}
                  </div>
                  <div className="text-[10px] absolute top-5 left-16 text-gray-400">
                    {item.description}
                  </div>
                  <div className="text-[10px] absolute bottom-0 left-16">
                    <span className="border-r-2 border-solid border-gray-200 pr-1 mr-1">
                      {item.area}
                    </span>
                    <span className="text-gray-400 mr-2">
                      멤버 {item.member}
                    </span>
                    <span className="text-gray-400 bg-gray-100 pl-1 pr-1 pt-0.5 pb-0.5 rounded-md">
                      {getInterestWithKey(item.favorite)}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                className="absolute top-0 right-0"
                value={item.id}
                onClick={() => handleDelete(`${item.id}`)}
              >
                <img
                  src={Images.delete}
                  alt="삭제버튼"
                  className="w-3 inline-block "
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentClubPage;
