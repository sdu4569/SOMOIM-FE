import { API_ENDPOINT } from "@/App";
import { accessTokenAtom, accessTokenExpirationAtom } from "./../libs/atoms";
import { useRecoilValue } from "recoil";
import { useState } from "react";

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
  const token = useRecoilValue(accessTokenAtom);
  const tokenExpiration = useRecoilValue(accessTokenExpirationAtom);

  if (authorized) {
    // to do : verify token
  }

  const mutate = async function (data: any): Promise<APIResponse> {
    setIsLoading(true);

    const response = await fetch(`${API_ENDPOINT}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorized && {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjc5Mzg0MzI3LCJleHAiOjE3MTA5MjAzMjd9.qltmshE27_Qsyc-EnkcpLgl3nfPJ9X5E12e7nrKMYeM`,
        }),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    setIsLoading(false);

    console.log(response);
    console.log(result);

    if (!response.ok) {
      return {
        ok: false,
        message: "Something went wrong.",
      };
    } else {
      return {
        ok: true,
        data: result,
      };
    }
  };

  return { mutate, isLoading };
}
