import { API_ENDPOINT } from "./../App";
import useMutation from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { accessTokenExpirationAtom } from "@/libs/atoms";
import { accessTokenAtom } from "@/libs/atoms";
import { useRecoilState } from "recoil";

export default function useAccessToken() {
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [tokenExpiration, setTokenExpiration] = useRecoilState(
    accessTokenExpirationAtom
  );

  return { token, tokenExpiration };
}
