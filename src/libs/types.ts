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
  name: string;
  area: string;
  birth: string;
  favorites: string[];
  gender: string;
  introduction: string;
  profileUrl?: string;
}

export interface UserClub {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  area: string;
  memberLimit: number;
  memberCnt: number;
  favorite: string;
}
