import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const accessTokenAtom = atom<string>({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const accessTokenExpirationAtom = atom<number>({
  key: "accessTokenExpiration",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});
