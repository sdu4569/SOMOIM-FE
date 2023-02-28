import { Route, Routes } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import ClubPage from "./page/ClubPage";
import InterestDetailPage from "./page/InterestDetailPage";
import InterestPage from "./page/InterestPage";
import MainPage from "./page/MainPage";
import ClubList from "./components/ClubList";
import RegionPage from "./page/RegionPage";
import SignUpPage from "./page/SignUpPage";
import RegionSelect from "./components/RegionSelect";
import ClubDetail from "./components/ClubDetail";
import BottomTabNavigator from "./components/BottomTabNavigator";
import ClubBoardWrite from "./components/ClubBoardWrite";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/interest" element={<InterestPage />} />
      <Route path="/region" element={<RegionPage />}>
        <Route path="home" element={<RegionSelect />} />
        <Route path="work" element={<RegionSelect />} />
        <Route path="interested" element={<RegionSelect />} />
      </Route>
      <Route path="/interest/detail" element={<InterestDetailPage />} />
      <Route path="/clubs" element={<ClubPage />}>
        <Route path="recommend" element={<ClubList />} />
        <Route path="new" element={<div className="min-h-screen" />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
      <Route path="/clubs/:id" element={<ClubDetail />}></Route>
      <Route path="/clubs/:id/write" element={<ClubBoardWrite />} />
      <Route path="/activity" element={<BottomTabNavigator />} />
      <Route path="/more" element={<BottomTabNavigator />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default PageNavigator;
