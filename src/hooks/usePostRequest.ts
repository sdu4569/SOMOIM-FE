import { API_ENDPOINT } from "@/App";
import { accessTokenAtom, accessTokenExpirationAtom } from "./../libs/atoms";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import useAccessToken from "./useAccessToken";

interface APIResponse {
  ok: boolean;
  message?: string;
  data?: any;
}

interface PostRequestOptions {
  authorized?: boolean;
  [key: string]: any;
}

export default function usePostRequest(
  url: string,
  { authorized }: PostRequestOptions = {
    authorized: false,
  }
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAccessToken();

  if (authorized) {
    // to do : verify token
  }

  const mutate = async function (data: any): Promise<APIResponse> {
    if (isLoading) return Promise.reject("Already loading");

    setIsLoading(true);

    const response = await fetch(`${API_ENDPOINT}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorized && {
          Authorization: "Bearer " + token,
        }),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    setIsLoading(false);

    return {
      ok: response.ok,
      data: result,
    };
  };

  return { mutate, isLoading };
}
