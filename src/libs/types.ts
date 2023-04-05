export interface FavoriteWithDetails {
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
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: number;
  title: string;
  activityTime: string;
  memberCnt: number;
  memberLimit: number;
  location: string;
  fee: string;
}

export interface ActivityMember {
  userId: number;
  userName: string;
  userImage?: string;
  activityId: number;
}

export interface ActivityForm {
  title: string;
  date: Date;
  time: string;
  location: string;
  fee: string;
  memberLimit: number;
}

export interface ClubResponse {
  ok: boolean;
  data: {
    content: Club[];
  };
}

export interface Comment {
  id: number;
  boardId: number;
  userId: number;
  comment: string;
  userName: string;
  profileImg?: string;
  createdAt: string;
  updatedAt: string;
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

export enum ModalType {
  POST = "post",
  DELETE_POST = "delPost",
  COMMENT = "comment",
  UPDATE_COMMENT = "updateComment",
  DELETE_COMMENT = "delComment",
}

export interface Post {
  id: number;
  category: PostCategory;
  commentCnt: number;
  content: string;
  createdAt: string;
  imageUrl?: string;
  likeCnt: number;
  title: string;
  updatedAt: string;
  userId: number;
  userImg?: string;
  userName: string;
}

export interface Like {
  id: number;
  userId: number;
  boardId: number;
}

export interface Album {
  id: number;
  userId: number;
  userName: string;
  userImg: string;
  clubId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  likeCnt: number;
}
