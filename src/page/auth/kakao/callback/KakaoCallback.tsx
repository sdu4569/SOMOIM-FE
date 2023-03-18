import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function KakaoCallback() {
  const location = useLocation();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    fetch("http://43.200.191.33:8080/users/oauth/kakao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    })
      .then((res) => {
        console.log(res.headers);
        console.log(...res.headers);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(document.cookie);
      });
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin w-10 aspect-square border-gray-100 border-t-black rounded-full border-4"></div>
    </div>
  );
}
