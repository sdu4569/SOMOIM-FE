import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import ClubPage from "./page/ClubPage";
import InterestDetailPage from "./page/InterestDetailPage";
import InterestPage from "./page/InterestPage";
import MainPage from "./page/MainPage";
import ClubList from "./components/ClubList";
import RegionPage from "./page/RegionPage";
import SignUpPage from "./page/SignUpPage";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/interest" element={<InterestPage />} />
      <Route path="/region" element={<RegionPage />} />
      <Route path="/interest/detail" element={<InterestDetailPage />} />
      <Route path="/clubs" element={<ClubPage />}>
        <Route path="recommend" element={<ClubList />} />
        <Route path="new" element={<ClubList />} />
      </Route>
    </Routes>
  );
};

export default PageNavigator;
