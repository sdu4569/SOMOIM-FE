import { accessTokenAtom, accessTokenExpirationAtom } from "@/libs/atoms";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import useMutation from "./useMutation";

export default function useLogin() {
  const setToken = useSetRecoilState(accessTokenAtom);
  const setTokenExp = useSetRecoilState(accessTokenExpirationAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutation("users/auth/signin");

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    const { ok, data, message } = await mutate({ email, password });
    if (ok) {
      setToken(data.accessToken);
      setTokenExp(new Date(data.accessTokenExpirationDateTime).getTime());
    } else {
      alert(message);
    }

    setIsLoading(false);

    return ok;
  };

  return { login, isLoading };
}
