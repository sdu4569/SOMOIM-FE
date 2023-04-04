import { Images } from "@/libs/Images";
import formatImageUrl from "@/util/formatImageUrl";

interface AvatarProps {
  readonly size: "md" | "lg";
  src?: string;
}

export default function Avatar({ size, src }: AvatarProps) {
  if (!src) {
    return (
      <img
        src={Images.user}
        alt="유저 프로필 사진"
        className={`${
          size === "md" ? "w-10" : "w-20"
        } aspect-square rounded-full bg-gray-200`}
      ></img>
    );
  }

  return (
    <img
      src={formatImageUrl(src, size === "md" ? "avatar" : "avatarLarge")}
      alt="유저 프로필 사진"
      className={`${
        size === "md" ? "w-10" : "w-20"
      } aspect-square rounded-full`}
    />
  );
}
