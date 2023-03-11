import PageHeader from "../components/PageHeader";
import ClubSearch from "../components/ClubSearch";
import UpdateInterestButton from "../components/UpdateInterestButton";
import Recommendation from "../components/Recommendation";
import { Images } from "../libs/Images";
import { Link } from "react-router-dom";
import BottomTabNavigator from "../components/BottomTabNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const userClubList: any[] = [
  {
    id: 1,
    clubTitle: "테스트",
    clubDescription: "테스트중입니다",
    interest: "outdoor",
    interestDetail: "",
    interestTitle: "아웃도어/여행",
    interestImage: Images.outdoor,
    clubImage: Images.clubImage,
    region: "남구",
    city: "부산광역시",
    member: 1,
  },
  {
    id: 4,
    clubTitle: "테스트4",
    clubDescription: "테스트중입니다",
    interest: "game",
    interestDetail: "보드게임",
    interestTitle: "게임/오락",
    interestImage: Images.game,
    clubImage: Images.clubImage,
    region: "남구",
    city: "서울특별시",
    member: 7,
  },
];

const MyActivityPage = () => {
  useEffect(() => {
    const userClub = document.querySelector("#userClub") as HTMLInputElement;
    if (userClubList.length == 0) {
      userClub.classList.add("text-blue-500");
    } else {
      userClub.classList.remove("text-blue-500");
    }
  }, []);
  return (
    <div className="h-full py-16 px-4 overflow-scroll">
      <PageHeader>
        <h2 className="text-xl">내활동</h2>
        <div className="flex space-x-8 items-center">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Link>
        </div>
      </PageHeader>

      <main>
        <h2 className="text-14 font-semibold mb-5" id="userClub">
          {userClubList.length !== 0 ? "가입한 클럽" : "클럽에 가입해 보세요!"}
        </h2>

        {userClubList?.map((item, idx) => {
          return (
            <Link to={`/clubs/${item.id}`} key={idx} state={item}>
              <div className="relative mt-4 h-12">
                <img
                  src={item.clubImage}
                  alt="클럽 이미지"
                  className="w-12 rounded-2xl inline-block border-dashed border-2 border-gray-500"
                />
                <div className="text-12 absolute top-2 left-16">
                  <img
                    src={item.interestImage}
                    className="h-3 inline-block mr-1"
                    alt="관심사 이미지"
                  />
                  {item.clubTitle}
                </div>
                <div className="text-10 absolute bottom-2 left-16">
                  <span className="border-r-2 border-solid border-gray-200 pr-1 mr-1">
                    {item.region}
                  </span>
                  <span className="text-gray-400">멤버 {item.member} </span>
                </div>
              </div>
            </Link>
          );
        })}
        <h2 className="text-14 font-semibold mb-5 mt-5">클럽찾기</h2>
        <ClubSearch />
        <UpdateInterestButton />
        <Recommendation />
      </main>
      <BottomTabNavigator />
    </div>
  );
};

export default MyActivityPage;
