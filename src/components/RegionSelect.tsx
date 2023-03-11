import { useLocation } from "react-router-dom";
import HeaderBackButton from "./HeaderBackButton";
import PageHeader from "./PageHeader";
import DaumPostCodeEmbed from "react-daum-postcode";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface RegionSelectProps {
  region: Region;
  closeModal: () => void;
  setValue: any;
}

const regionObj = {
  home: "집",
  work: "직장(활동지역)",
  interested: "관심지역",
};

export type Region = "home" | "work" | "interested";

export default function RegionSelect({
  region,
  closeModal,
  setValue,
}: RegionSelectProps) {
  const onSearchComplete = (data: any) => {
    console.log(data);
    setValue(region, data.bname2);
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
          <h2 className="text-xl">{regionObj[region]} 지역 선택</h2>
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
