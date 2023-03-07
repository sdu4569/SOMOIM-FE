import { Route, Routes } from "react-router-dom";
import AuthPage from "./page/AuthPage";

import MyActivityPage from "./page/MyActivityPage";
import UpdateDetailPage from "./page/UpdateDetailPage";
import InterestSearchPage from "./page/InterestSearchPage";
import ClubPage from "./page/ClubPage";
import InterestDetailChoicePage from "./page/InterestDetailChoicePage";
import InterestPage from "./page/InterestPage";
import MainPage from "./page/MainPage";
import RegionPage from "./page/RegionPage";
import SignUpPage from "./page/SignUpPage";
import RegionSelect from "./components/RegionSelect";
import ClubDetail from "./components/ClubDetail";
import ClubBoardWrite from "./components/ClubBoardWrite";
import ClubsList from "./components/ClubsList";
import ClubSearchPage from "./page/ClubSearchPage";
import MorePage from "./page/MorePage";
import UpdateUserPage from "./page/UpdateUserPage";
import RecentClubPage from "./page/RecentClubPage";
import InterestClubPage from "./page/InterestClubPage";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/interest" element={<InterestPage />} />
      <Route path="/:id" element={<InterestSearchPage />} />
      <Route path="/search" element={<ClubSearchPage />} />
      <Route path="/interest/detail" element={<InterestDetailChoicePage />} />
      <Route path="/activity" element={<MyActivityPage />} />
      <Route path="/update_detail" element={<UpdateDetailPage />} />
      <Route path="/update_user" element={<UpdateUserPage />} />
      <Route path="/region" element={<RegionPage />}>
        <Route path="home" element={<RegionSelect />} />
        <Route path="work" element={<RegionSelect />} />
        <Route path="interested" element={<RegionSelect />} />
      </Route>
      <Route path="/clubs" element={<ClubPage />}>
        <Route path="recommend" element={<ClubsList />} />
        <Route path="new" element={<div className="min-h-screen" />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
      <Route path="/clubs/:id" element={<ClubDetail />}></Route>
      <Route path="/clubs/:id/write" element={<ClubBoardWrite />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/recent_club" element={<RecentClubPage />} />
      <Route path="/interest_club" element={<InterestClubPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default PageNavigator;
