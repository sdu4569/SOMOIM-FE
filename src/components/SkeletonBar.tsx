export default function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`p-2 rounded-md bg-gray-200 ${className} animate-pulse`}
    ></div>
  );
}
