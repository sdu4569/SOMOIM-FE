import { Route, Routes } from "react-router-dom";
import MyActivityPage from "./page/myactivity/MyActivityPage";
import UpdateDetailPage from "./page/more/editInterest/UpdateDetailPage";
import InterestSearchPage from "./page/InterestSearchPage";
import ClubPage from "./page/clubs/ClubPage";
import InterestPage from "./page/InterestPage";
import MainPage from "./page/MainPage";
import ClubPost from "./page/clubs/[clubId]/posts/[postId]/ClubPost";
import ClubEditPage from "./page/clubs/[clubId]/edit/ClubEditPage";
import CreateActivity from "./page/clubs/[clubId]/createActivity/CreateActivityPage";
import CreateClub from "./page/clubs/create/CreateClubPage";
import GalleryPost from "./page/clubs/[clubId]/gallery/[galleryId]/GalleryPost";
import ClubSearchPage from "./page/search/ClubSearchPage";
import MorePage from "./page/more/MorePage";
import UpdateUserPage from "./page/more/editProfile/UpdateUserPage";
import RecentClubPage from "./page/more/recent/RecentClubPage";
import Landing from "./page/Landing";
import SignupLayout from "./page/signup/SignupLayout";
import Register from "./page/signup/register/Register";
import RegisterProfile from "./page/signup/profile/RegisterProfile";
import RegisterInterest from "./page/signup/interest/RegisterInterest";
import RegisterInterestDetail from "./page/signup/interest/detail/RegisterInterestDetail";
import KakaoCallback from "./page/auth/kakao/callback/KakaoCallback";
import GoogleCallback from "./page/auth/google/callback/GoogleCallback";
import InterestDetailChoicePage from "./page/search/[category]/InterestDetailChoicePage";
import FavoriteClubPage from "./page/more/favorite/FavoriteClubPage";
import ClubDetail from "./page/clubs/[clubId]/ClubDetail";
import ClubBoardWrite from "./page/clubs/[clubId]/write/ClubBoardWrite";
import UpdateClubPostPage from "./page/UpdateClubPostPage";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/signup" element={<SignupLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<RegisterProfile />} />
        <Route path="interest" element={<RegisterInterest />} />
        <Route path="interest/detail" element={<RegisterInterestDetail />} />
      </Route>

      <Route path="/interest" element={<InterestPage />} />
      <Route path="/interest/detail" element={<InterestDetailChoicePage />} />

      <Route path="/search" element={<ClubSearchPage />} />
      <Route path="/search/:interest" element={<InterestSearchPage />} />

      <Route path="/activity" element={<MyActivityPage />} />
      <Route path="/activity/editInterest" element={<UpdateDetailPage />} />

      <Route path="/clubs" element={<ClubPage />} />
      <Route path="/clubs/create" element={<CreateClub />}></Route>
      <Route path="/clubs/:clubId" element={<ClubDetail />}></Route>
      <Route path="/clubs/:clubId/edit" element={<ClubEditPage />} />
      <Route
        path="/clubs/:clubId/createActivity"
        element={<CreateActivity />}
      />
      <Route path="/clubs/:clubId/post/:postId" element={<ClubPost />} />
      <Route
        path="/clubs/:clubId/update_post/:postId/"
        element={<UpdateClubPostPage />}
      />

      <Route path="/clubs/:clubId/gallery/:id" element={<GalleryPost />} />
      <Route path="/clubs/:clubId/write" element={<ClubBoardWrite />} />

      <Route path="/more" element={<MorePage />} />
      <Route path="/more/editProfile" element={<UpdateUserPage />} />

      <Route
        path="/more/editInterest/update/detail"
        element={<RegisterInterestDetail />}
      />
      <Route path="/more/recent" element={<RecentClubPage />} />
      <Route path="/more/favorite" element={<FavoriteClubPage />} />

      <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default PageNavigator;
