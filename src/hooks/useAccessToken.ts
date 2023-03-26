import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { accessTokenExpirationAtom } from "@/libs/atoms";
import { accessTokenAtom } from "@/libs/atoms";
import { useRecoilState } from "recoil";

export default function useAccessToken() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [tokenExpiration, setTokenExpiration] = useRecoilState(
    accessTokenExpirationAtom
  );

  useEffect(() => {
    if (!token || !tokenExpiration) {
      // need to login
      // navigate("/landing", {
      //   replace: true,
      // });
    }

    if (tokenExpiration - Date.now() < 5000) {
      // refresh token
    }
  }, [token, tokenExpiration]);

  return token;
}
