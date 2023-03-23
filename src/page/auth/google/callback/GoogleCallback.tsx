import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { LoginResponse } from "@/libs/types";
import { useSetRecoilState } from "recoil";
import {
  accessTokenAtom,
  accessTokenExpirationAtom,
  loginState,
} from "@/libs/atoms";

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginState);
  const setAccessTokenAtom = useSetRecoilState(accessTokenAtom);
  const setAccessTokenExpiration = useSetRecoilState(accessTokenExpirationAtom);

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
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("로그인에 실패했습니다.");
        }
        return res.json();
      })
      .then((data: LoginResponse) => {
        setLoginState(true);
        setAccessTokenAtom(data.accessToken);
        setAccessTokenExpiration(
          new Date(data.accessTokenExpirationDateTime).getTime()
        );
        console.log(data);
        navigate("/clubs");
      })
      .catch((e) => {
        alert("로그인에 실패했습니다.");
        navigate("/landing");
      });
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
