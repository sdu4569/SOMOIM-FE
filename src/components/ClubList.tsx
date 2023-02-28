import { Images } from "./Images";

export const ClubList = [
  {
    clubTitle: "테스트",
    interest: "outdoor",
    interestImage: Images.outdoor,
    clubImage: "http://placehold.it/100",
    country: "남구",
    member: 1,
  },
  {
    clubTitle: "테스트2",
    interest: "game",
    interestImage: Images.game,
    clubImage: "http://placehold.it/100",
    country: "남구",
    member: 3,
  },
  {
    clubTitle: "테스트3",
    interest: "car",
    interestImage: Images.car,
    clubImage: "http://placehold.it/100",
    country: "남구",
    member: 5,
  },
  {
    clubTitle: "테스트4",
    interest: "game",
    interestImage: Images.game,
    clubImage: "http://placehold.it/100",
    country: "남구",
    member: 7,
  },
];
/*
import { Link } from "react-router-dom";
import Club from "./Club";

export default function ClubList() {
  return (
    <ul className="flex flex-col space-y-5 mt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <Link to={`/clubs/${i}`} key={i}>
          <Club />
        </Link>
      ))}
    </ul>
  );
}
*/