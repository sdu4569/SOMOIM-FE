import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../../components/Spinner";

export default function GoogleCallback() {
  const location = useLocation();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    console.log(code);
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
