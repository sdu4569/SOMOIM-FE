import { PostCategory } from "@/libs/types";

export default function getPostCategoryWithKey(key: PostCategory) {
  switch (key) {
    case "FREE":
      return "자유 글";
    case "FAVORITE":
      return "관심사 공유";
    case "MEET":
      return "정모후기";
    case "JOIN":
      return "가입인사";
    case "ANNOUNCEMENT":
      return "공지사항";
    default:
      return "전체 글";
  }
}
