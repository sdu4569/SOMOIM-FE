import PageHeader from "@/components/PageHeader";
import UpdateFavoriteButton from "@/components/UpdateFavoriteButton";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import UpdateUserButton from "@/components/UpdateUserButton";
import RecentClubButton from "@/components/RecentClubButton";
import FavoriteClubButton from "@/components/FavoriteClubButton";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";

const MorePage = () => {
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="h-full py-16 overflow-scroll px-4">
      <PageHeader>
        <h2 className="text-xl">더 보기</h2>
      </PageHeader>

      <main>
        <UpdateUserButton user={user} />
        <UpdateFavoriteButton />
        <FavoriteClubButton />
        <RecentClubButton />
      </main>
      <BottomTabNavigator />
    </div>
  );
};

export default MorePage;
