import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { LoginResponse, User } from "@/libs/types";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom, accessTokenExpirationAtom } from "@/libs/atoms";
import { API_ENDPOINT } from "@/App";
import isUserRequiredFieldsFilled from "@/util/isRequiredFieldsFilled";

export default function KakaoCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const setAccessTokenAtom = useSetRecoilState(accessTokenAtom);
  const setAccessTokenExpiration = useSetRecoilState(accessTokenExpirationAtom);

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
        if (!res.ok) {
          console.log(res);
        }
        return res.json();
      })
      .then(async (data: LoginResponse) => {
        if (!data.data.accessToken) {
          alert("로그인에 실패했습니다.");
          navigate("/landing");
          return;
        }
        const accessToken = data.data.accessToken;
        const accessTokenExpirationDateTime = new Date(
          data.data.accessTokenExpirationDateTime
        ).getTime();
        setAccessTokenAtom(accessToken);
        setAccessTokenExpiration(
          new Date(accessTokenExpirationDateTime).getTime()
        );

        const response = await (
          await fetch(`${API_ENDPOINT}/users`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
        ).json();

        const user: User = response.data;

        if (!isUserRequiredFieldsFilled(user)) {
          navigate("/signup/profile");
          return;
        }

        if (!user.favorites || user.favorites.length === 0) {
          navigate("/signup/favorite");
          return;
        }
        navigate("/clubs");
      })
      .catch((e) => {
        alert("로그인에 실패했습니다.");
        console.log(e);
        navigate("/landing");
      });
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
