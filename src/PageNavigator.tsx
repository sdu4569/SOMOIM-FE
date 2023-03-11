import { Route, Routes, useLocation } from "react-router-dom";
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
import ClubPost from "./page/ClubPost";
import SearchPage from "./page/SearchPage";
import CategorySearchPage from "./page/CategorySearchPage";
import ClubEditPage from "./page/ClubEditPage";
import CreateActivity from "./page/CreateActivityPage";
import CreateClub from "./page/CreateClubPage";
import GalleryPost from "./page/GalleryPost";
import ClubSearchPage from "./page/ClubSearchPage";
import MorePage from "./page/MorePage";
import UpdateUserPage from "./page/UpdateUserPage";
import RecentClubPage from "./page/RecentClubPage";
import InterestClubPage from "./page/InterestClubPage";
import Landing from "./page/Landing";
import LogIn from "./page/LogIn";
import SignupLayout from "./page/signup/SignupLayout";
import Register from "./page/signup/register/Register";
import RegisterProfile from "./page/signup/profile/RegisterProfile";
import { AnimatePresence } from "framer-motion";

const PageNavigator = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/signin" element={<LogIn />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<SignupLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<RegisterProfile />} />
      </Route>
      <Route path="/interest" element={<InterestPage />} />
      <Route path="/:id" element={<InterestSearchPage />} />
      <Route path="/search" element={<ClubSearchPage />} />
      <Route path="/interest/detail" element={<InterestDetailChoicePage />} />
      <Route path="/activity" element={<MyActivityPage />} />
      <Route path="/update_detail" element={<UpdateDetailPage />} />
      <Route path="/update_user" element={<UpdateUserPage />} />
      <Route path="/region" element={<RegionPage />} />
      <Route path="/clubs" element={<ClubPage />}>
        <Route path="recommend" element={<ClubsList />} />
        <Route path="new" element={<div className="min-h-screen" />} />
        <Route path="*" element={<div>404</div>} />
      </Route>

      <Route path="/clubs/create" element={<CreateClub />}></Route>
      <Route path="/clubs/:clubId" element={<ClubDetail />}></Route>
      <Route path="/clubs/:clubId/edit" element={<ClubEditPage />} />
      <Route
        path="/clubs/:clubId/createActivity"
        element={<CreateActivity />}
      />
      <Route path="/clubs/:clubId/post/:postId" element={<ClubPost />} />
      <Route path="/clubs/:clubId/gallery/:id" element={<GalleryPost />} />
      <Route path="/clubs/:clubId/write" element={<ClubBoardWrite />} />
      <Route path="/search/:category" element={<CategorySearchPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/recent_club" element={<RecentClubPage />} />
      <Route path="/interest_club" element={<InterestClubPage />} />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default PageNavigator;
