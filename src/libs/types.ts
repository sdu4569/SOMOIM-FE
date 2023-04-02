export interface InterestWithDetails {
  name: string;
  detail: string[];
}

export interface LoginResponse {
  ok: true;
  data: {
    accessToken: string;
    accessTokenExpirationDateTime: string;
    refreshToken: string;
    refreshTokenExpirationDateTime: string;
  };
}

export interface User {
  id: number;
  name: string;
  area: string;
  birth: string;
  favorites: string[];
  gender: string;
  introduction: string;
  profileUrl?: string;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  area: string;
  memberLimit: number;
  memberCnt: number;
  favorite: string;
}

export interface ClubResponse {
  ok: boolean;
  data: Club[];
}

export interface Member {
  userId: number;
  name: string;
  profileUrl?: string;
  introduction?: string;
}

export enum PostCategory {
  ALL = "ALL",
  FREE = "FREE",
  FAVORITE = "FAVORITE",
  MEET = "MEET",
  JOIN = "JOIN",
  ANNOUNCEMENT = "ANNOUNCEMENT",
}

export enum Tabs {
  INFO,
  BOARD,
  PHOTO,
  CHAT,
}
