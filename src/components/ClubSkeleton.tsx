import SkeletonBar from "./SkeletonBar";

export default function ClubSkeleton() {
  return (
    <div className="flex space-x-4">
      <div className="rounded-3xl w-16 aspect-square bg-gray-500 relative animate-pulse"></div>
      <div className="flex-1 flex flex-col justify-evenly">
        <SkeletonBar className="w-20" />
        <SkeletonBar className="w-52" />
        <div className="flex space-x-2 text-xs">
          <div className="flex divide-x-2 divide-gray-300 items-center">
            <SkeletonBar className="w-10 mr-1" />
            <SkeletonBar className="w-10 ml-1" />
          </div>
          <SkeletonBar className="w-16" />
        </div>
      </div>
    </div>
  );
}
