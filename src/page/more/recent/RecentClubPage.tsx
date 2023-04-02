import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Images } from "@/libs/Images";
import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import getFavoriteWithKey from "@/util/getFavoriteWithKey";
import Club from "@/components/Club";

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
        {recentClubList.map((item) => {
          return (
            <div className="relative mb-4" key={item.id}>
              <Link to={`/clubs/${item.id}`}>
                <Club data={item} />
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
