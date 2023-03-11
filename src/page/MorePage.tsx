import PageHeader from "../components/PageHeader";
import UpdateInterestButton from "../components/UpdateInterestButton";
import BottomTabNavigator from "../components/BottomTabNavigator";
import UpdateUserButton from "../components/UpdateUserButton";
import RecentClubButton from "../components/RecentClubButton";
import InterestClubButton from "../components/FavoriteClubButton";

const MorePage = () => {
  return (
    <div className="h-full pt-14 pb-16 overflow-scroll">
      <PageHeader>
        <h2 className="text-xl">더보기</h2>
      </PageHeader>

      <main>
        <UpdateUserButton />
        <UpdateInterestButton />
        <InterestClubButton />
        <RecentClubButton />
      </main>
      <BottomTabNavigator />
    </div>
  );
};

export default MorePage;
