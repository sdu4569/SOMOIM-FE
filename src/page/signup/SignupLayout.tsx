import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

export default function SignupLayout() {
  return (
    <AnimatePresence>
      <Outlet />
    </AnimatePresence>
  );
}
