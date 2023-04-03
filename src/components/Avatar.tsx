import { Images } from "@/libs/Images";

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

  if (!src.includes("imagedelivery")) {
    return (
      <img
        src={src}
        alt="유저 프로필 사진"
        className={`${
          size === "md" ? "w-10" : "w-20"
        } aspect-square rounded-full bg-gray-200`}
      ></img>
    );
  }

  return (
    <img
      src={`${src}/${size === "md" ? "avatar" : "avatarLarge"}`}
      alt="유저 프로필 사진"
      className={`${
        size === "md" ? "w-10" : "w-20"
      } aspect-square rounded-full`}
    />
  );
}
