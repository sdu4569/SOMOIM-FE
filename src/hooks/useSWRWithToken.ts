import useAccessToken from "@/hooks/useAccessToken";
export default function useSWRWithToken(key: string, options: any) {
  const { token, tokenExpiration } = useAccessToken();
}
