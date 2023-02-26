import PageHeader from "./PageHeader";

interface RegionSelectProps {
  title: string;
  onBack: any;
}

export default function RegionSelect({ title, onBack }: RegionSelectProps) {
  return (
    <>
      <PageHeader back onBack={onBack} title={`${title} 클럽 선택`} />
      <input
        type="text"
        placeholder="동, 읍, 면을 입력해주세요."
        className="rounded-md bg-gray-300 mt-12 text-black outline-none p-4 w-full my-4"
      />
    </>
  );
}
