import { AnimatePresence } from "framer-motion";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import RegisterProfile from "./profile/RegisterProfile";
import Register from "./register/Register";

export default function SignupLayout() {
  return (
    <AnimatePresence>
      <Outlet />
    </AnimatePresence>
  );
}
