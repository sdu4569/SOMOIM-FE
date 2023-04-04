import { Club } from "@/libs/types";
import getFavoriteWithKey from "@/util/getFavoriteWithKey";
import { useEffect } from "react";

interface ClubComponentProps {
  data: Club;
}

export default function ClubComponent({ data }: ClubComponentProps) {
  return (
    <div className="flex space-x-4">
      <div className="rounded-3xl w-16 aspect-square bg-blue-500 relative">
        {data.imageUrl && (
          <div className="w-full h-full overflow-hidden rounded-3xl">
            <img
              src={data.imageUrl}
              alt="클럽 대표 사진"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="text-white absolute bg-red-600 rounded-2xl p-1 text-xs flex justify-center items-center -top-1 -right-1 text-[8px]">
          NEW
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <span className="">{data.name}</span>
        <span className="text-sm text-gray-500 w-full line-clamp-1">
          {data.description.substring(0, 30)}
        </span>
        <div className="flex space-x-2 text-xs">
          <div className="flex divide-x-2 divide-gray-300 items-center">
            <span className="pr-1">{data.area}</span>
            <span className="pl-1 text-gray-500">멤버 {data.member}</span>
          </div>
          <div className="rounded-full bg-gray-200 text-gray-500 px-1 text-[8px]">
            {getFavoriteWithKey(data.favorite)}
          </div>
        </div>
      </div>
    </div>
  );
}
