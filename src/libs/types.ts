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
