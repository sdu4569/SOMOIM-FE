import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../../components/Spinner";

export default function GoogleCallback() {
  const location = useLocation();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    fetch("http://43.200.191.33:8080/users/oauth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    }).then((res) => {
      console.log(res);
    });
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
