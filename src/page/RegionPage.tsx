import { useForm } from "react-hook-form";
import PageHeader from "@/components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import HeaderBackButton from "@/components/HeaderBackButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import RegionSelect from "@/components/RegionSelect";

interface RegionPageProps {
  closeModal: () => void;
  setInputValue: any;
}

interface RegionFormData {
  home: string;
  work?: string;
  interested?: string;
}

const regionObj = {
  home: "집",
  work: "직장(활동지역)",
  interested: "관심지역",
};

type Region = "home" | "work" | "interested";

const RegionPage = ({ closeModal, setInputValue }: RegionPageProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, setValue, watch } = useForm<RegionFormData>({
    shouldFocusError: false,
  });

  const onSubmit = (data: RegionFormData) => {
    setInputValue("location", watch("home"));
    closeModal();
  };

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setSelectedRegion(e.currentTarget.id as Region);
    setInRegionSearchModal(true);
  };

  const [inRegionSearchModal, setInRegionSearchModal] =
    useState<boolean>(false);

  const [selectedRegion, setSelectedRegion] = useState<Region>("home");

  return (
    <>
      <AnimatePresence>
        {inRegionSearchModal && (
          <RegionSelect
            setValue={setValue}
            closeModal={() => setInRegionSearchModal(false)}
            title={regionObj[selectedRegion]}
            inputId={selectedRegion}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", ease: "easeInOut" }}
        className="absolute bg-white h-full z-[100]"
      >
        <form
          ref={formRef}
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="p-4"
        >
          <PageHeader className="!z-50">
            <div className="flex items-center space-x-4">
              <HeaderBackButton onClick={closeModal} />
              <h2 className="text-xl">내 지역</h2>
            </div>
            <div>
              <button onClick={handleSubmit(onSubmit)} className="text-lg">
                저장
              </button>
            </div>
          </PageHeader>
          <section className="mt-12">
            <header className="my-8">
              <span className="text-black text-lg">
                집, 직장 인근의 클럽을 찾습니다.
              </span>
            </header>
            <ul className="flex flex-col space-y-4 text-lg">
              <li>
                <label
                  htmlFor="home"
                  className="flex justify-between space-x-4"
                >
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon
                      icon={faHouseUser}
                      className="text-black w-10"
                    />
                    <span className="text-black w-20">집</span>
                  </div>
                  <input
                    id="home"
                    type="text"
                    {...register("home", { required: true })}
                    placeholder="필수"
                    disabled={inRegionSearchModal}
                    onFocus={onInputFocus}
                    className="rounded-md bg-gray-100 text-black outline-none p-4 w-full"
                  />
                </label>
              </li>
              <li>
                <label
                  htmlFor="work"
                  className="flex justify-between space-x-4"
                >
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="text-black w-10"
                    />
                    <span className="text-black w-20">직장</span>
                  </div>
                  <input
                    id="work"
                    type="text"
                    {...register("work")}
                    placeholder="권장"
                    disabled={inRegionSearchModal}
                    onFocus={onInputFocus}
                    className="rounded-md bg-gray-100 text-black outline-none p-4 w-full"
                  />
                </label>
              </li>
              <li>
                <label
                  htmlFor="interested"
                  className="flex justify-between space-x-4"
                >
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-black w-10"
                    />
                    <span className="text-black w-20">관심지역</span>
                  </div>
                  <input
                    id="interested"
                    type="text"
                    {...register("interested")}
                    placeholder="선택"
                    disabled={inRegionSearchModal}
                    onFocus={onInputFocus}
                    className="rounded-md bg-gray-100 text-black outline-none p-4 w-full"
                  />
                </label>
              </li>
            </ul>
          </section>
        </form>
      </motion.div>
    </>
  );
};

export default RegionPage;
