import PageHeader from "@/components/PageHeader";
import ClubSearch from "@/components/ClubSearch";
import UpdateInterestButton from "@/components/UpdateInterestButton";
import Recommendation from "@/components/Recommendation";
import { imageMap } from "@/libs/Images";
import { Link } from "react-router-dom";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import FloatButton from "@/components/FloatButton";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import Club from "@/components/Club";
import { useEffect } from "react";

const MyActivityPage = () => {
  const token = useAccessToken();
  const { data: joinedClubs, isLoading } = useSWR(["users/join-clubs", token]);

  useEffect(() => {
    console.log(joinedClubs);
  }, [joinedClubs]);

  return (
    <div className="h-full pt-16 pb-20 px-4 overflow-scroll">
      <PageHeader>
        <h2 className="text-xl">내 활동</h2>
        <div className="flex space-x-8 items-center">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Link>
        </div>
      </PageHeader>

      <main className="flex flex-col space-y-4">
        <section className="flex flex-col space-y-4">
          <h2 className="text-lg" id="userClub">
            {joinedClubs?.data?.length
              ? "가입한 클럽"
              : "클럽에 가입해 보세요!"}
          </h2>

          <ul className="flex flex-col space-y-4">
            {joinedClubs?.data?.length ? (
              joinedClubs.data.map((club: any) => {
                return (
                  <Link to={`/clubs/${club.id}`} key={club.id}>
                    <Club data={club} />
                  </Link>
                );
              })
            ) : (
              <p className="w-full text-center text-base text-gray-300 py-4">
                가입한 클럽이 없습니다.
              </p>
            )}
          </ul>
        </section>
        <section className="flex flex-col space-y-4">
          <h2 className="text-lg">클럽찾기</h2>
          <div>
            <ClubSearch />
          </div>
        </section>
        <UpdateInterestButton />
        <Recommendation />
        <div className="absolute bottom-20 right-8">
          <FloatButton to={`/clubs/create`}>
            <FontAwesomeIcon icon={faPlus} />
            <p className="text-sm">개설</p>
          </FloatButton>
        </div>
      </main>
      <BottomTabNavigator />
    </div>
  );
};

export default MyActivityPage;
