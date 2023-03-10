export default function JoinClub() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-lg w-full p-4 flex bg-white self-end flex-col space-y-4"
    >
      <header className="flex justify-between">
        <h1>가입인사를 작성해주세요.</h1>
        <div className="w-8 rounded-full aspect-square bg-blue-500"></div>
      </header>
      <input
        type="text"
        className="rounded-md p-2 bg-gray-300 outline-none"
        placeholder="가입인사를 작성해주세요!"
      />
      <div className="text-blue-500 flex divide-x w-full divide-gray-300">
        <button className="flex justify-center items-center flex-1">
          취소
        </button>
        <button className="flex justify-center items-center flex-1">
          확인
        </button>
      </div>
    </div>
  );
}
