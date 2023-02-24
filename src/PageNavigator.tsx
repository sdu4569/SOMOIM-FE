import { Route, Routes } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import InterestPage from "./page/InterestPage";
import MainPage from "./page/MainPage";
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
    </Routes>
  );
};

export default PageNavigator;
