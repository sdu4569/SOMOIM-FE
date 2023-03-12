import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function KakaoCallback() {
  const location = useLocation();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    console.log(code);
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin w-10 aspect-square border-gray-100 border-t-black rounded-full border-4"></div>
    </div>
  );
}
