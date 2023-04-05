import { API_ENDPOINT } from "@/App";
import { accessTokenAtom, accessTokenExpirationAtom } from "@/libs/atoms";
import { AnimatePresence } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SWRConfig } from "swr";
interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const setToken = useSetRecoilState(accessTokenAtom);
  const [tokenExp, setTokenExp] = useRecoilState(accessTokenExpirationAtom);
  return (
    <SWRConfig
      value={{
        fetcher: ([url, token]: [string, string]) => {
          if (tokenExp - Date.now() < 5000) {
            // refresh token
            fetch(`${API_ENDPOINT}/users/auth/reissue`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }

          return fetch(`${API_ENDPOINT}/${url}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }).then((res) => res.json());
        },
      }}
    >
      <div
        className={`bg-white w-[400px] h-[740px] overflow-hidden rounded-md relative ${className}`}
      >
        <AnimatePresence>{children}</AnimatePresence>
      </div>
    </SWRConfig>
  );
}
