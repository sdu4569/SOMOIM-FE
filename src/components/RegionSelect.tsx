import HeaderBackButton from "./HeaderBackButton";
import PageHeader from "./PageHeader";
import DaumPostCodeEmbed from "react-daum-postcode";
import { motion } from "framer-motion";

interface RegionSelectProps {
  title: string;
  inputId: string;
  closeModal: () => void;
  setValue: any;
}

export default function RegionSelect({
  title,
  inputId,
  closeModal,
  setValue,
}: RegionSelectProps) {
  const onSearchComplete = (data: any) => {
    console.log(data);
    setValue(inputId, data.bname2);
    closeModal();
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", ease: "easeInOut" }}
      className="absolute z-[200] inset-0 w-full h-full p-4 bg-white rounded-md flex flex-col items-start justify-start text-black"
    >
      <PageHeader>
        <div className="flex items-center space-x-4">
          <HeaderBackButton onClick={closeModal} />
          <h2 className="text-xl">{title} 지역 선택</h2>
        </div>
      </PageHeader>
      <div className="mt-12 h-full w-full">
        <DaumPostCodeEmbed
          style={{ height: "100%" }}
          onComplete={onSearchComplete}
        />
      </div>
    </motion.div>
  );
}
