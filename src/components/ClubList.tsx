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
