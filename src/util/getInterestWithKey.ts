import { InterestList } from "@/libs/InterestList";

export default function getInterestWithKey(key: string) {
  return (
    InterestList.find((interest) => interest.interest === key)?.title ||
    "아웃도어/여행"
  );
}
