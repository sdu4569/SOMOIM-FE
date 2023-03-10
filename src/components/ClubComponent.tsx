export default function ClubComponent() {
  return (
    <div className="flex space-x-4">
      <div className="rounded-3xl w-16 aspect-square bg-blue-500 relative">
        <div className="text-white absolute bg-red-600 rounded-2xl p-1 text-xs flex justify-center items-center -top-1 -right-1 text-[8px]">
          NEW
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <span className="">클럽 이름</span>
        <span className="text-sm text-gray-500">클럽 설명</span>
        <div className="flex space-x-2 text-xs">
          <div className="flex divide-x-2 divide-gray-300 items-center">
            <span className="pr-1">지역</span>
            <span className="pl-1 text-gray-500">멤버 236</span>
          </div>
          <div className="rounded-full bg-gray-200 text-gray-500 px-1 text-[8px]">
            아웃도어/여행
          </div>
        </div>
      </div>
    </div>
  );
}
