export interface InterestWithDetails {
  name: string;
  detail: string[];
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpirationDateTime: string;
  refreshToken: string;
  refreshTokenExpirationDateTime: string;
}

export interface User {
  name: string;
  area: string;
  birth: string;
  favorite: string;
  gender: string;
  introduction: string;
  profileUrl?: string;
}
