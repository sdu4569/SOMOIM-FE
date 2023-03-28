import SkeletonBar from "./SkeletonBar";

export default function PostSkeleton() {
  return (
    <div className="py-2">
      <header className="flex justify-between items-center">
        <div className="flex space-x-2 items-center ">
          <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse"></div>
          <SkeletonBar className="w-20" />
        </div>
        <div>
          <SkeletonBar className="w-20" />
        </div>
      </header>
      <div className="py-4 flex justify-between items-start">
        <div className="flex flex-col flex-1 space-y-2">
          <SkeletonBar className="w-32" />
          <SkeletonBar className="w-48" />
          <SkeletonBar className="w-48" />
          <SkeletonBar className="w-48" />
        </div>
        <div className="w-28 aspect-video bg-gray-500 rounded-md animate-pulse"></div>
      </div>
      <div className="flex py-2 justify-between items-center border-y-2 border-gray-200">
        <div className="flex space-x-4">
          <SkeletonBar className="w-40" />
        </div>
        <div>
          <SkeletonBar className="w-20" />
        </div>
      </div>
    </div>
  );
}
