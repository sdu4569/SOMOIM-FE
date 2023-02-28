import { Route, Routes } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import InterestDetailChoicePage from "./page/InterestDetailChoicePage";
import InterestPage from "./page/InterestPage";
import MainPage from "./page/MainPage";
import MyActivityPage from "./page/MyActivityPage";
import RegionPage from "./page/RegionPage";
import SignUpPage from "./page/SignUpPage";
import UpdateDetailPage from "./page/UpdateDetailPage";
import InterestSearchPage from "./page/InterestSearchPage";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/interest" element={<InterestPage />} />
      <Route path="/:id" element={<InterestSearchPage />} />
      <Route path="/region" element={<RegionPage />} />
      <Route path="/interest/detail" element={<InterestDetailChoicePage />} />
      <Route path="/activity" element={<MyActivityPage />} />
      <Route path="/update_detail" element={<UpdateDetailPage />} />
    </Routes>
  );
};

export default PageNavigator;
