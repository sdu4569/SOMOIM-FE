import { Link } from "react-router-dom";
import ClubComponent from "./Club";

import ClubSkeleton from "./ClubSkeleton";

import { Club } from "@/libs/types";

export default function ClubsList({ clubs }: { clubs?: Club[] }) {
  if (!clubs) {
    return (
      <ul className="flex flex-col space-y-5 mt-4 px-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ClubSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="flex flex-col space-y-5 mt-4 px-4">
        {clubs.map((post) => (
          <Link to={`/clubs/${post.id}`} key={post.id}>
            <ClubComponent data={post} />
          </Link>
        ))}
      </ul>
    </>
  );
}
