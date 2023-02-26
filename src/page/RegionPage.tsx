import { useForm } from "react-hook-form";
import { useState, useRef, MouseEvent } from "react";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import RegionSelect from "../components/RegionSelect";

const regionObj = {
  home: "집",
  work: "직장(활동지역)",
  interested: "관심지역",
};

type Region = keyof typeof regionObj;

const RegionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [onSelectRegion, setOnSelectRegion] = useState<boolean>(false);
  const [targetInput, setTargetInput] = useState<HTMLInputElement | null>(null);
  const [id, setId] = useState<Region>();

  const onInputClick = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    e.currentTarget.blur();
    setTargetInput(e.currentTarget);
    setId(e.currentTarget.id as Region);
    setOnSelectRegion(true);
  };

  return (
    <>
      {onSelectRegion && id && (
        <div className="absolute z-10 inset-0 w-full h-full p-4 bg-white rounded-md flex flex-col items-start justify-start text-black animate-slide-up">
          <RegionSelect
            title={regionObj[id]}
            onBack={() => setOnSelectRegion(false)}
          ></RegionSelect>
        </div>
      )}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <PageHeader back title="내 지역" next="저장" />
        <section className="mt-12">
          <header className="my-8">
            <span className="text-black text-xl">
              집, 직장 인근의 클럽을 찾습니다.
            </span>
          </header>
          <ul className="flex flex-col space-y-4">
            <li>
              <label htmlFor="home" className="flex justify-between space-x-4">
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={faHouseUser}
                    className="text-black text-xl w-10"
                  />
                  <span className="text-black text-xl w-20">집</span>
                </div>
                <input
                  onClick={onInputClick}
                  id="home"
                  type="text"
                  {...register("location", { required: true })}
                  placeholder="필수"
                  className="rounded-md bg-gray-300 text-black outline-none p-4 flex-1"
                />
              </label>
            </li>
            <li>
              <label htmlFor="work" className="flex justify-between space-x-4">
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-black text-xl w-10"
                  />
                  <span className="text-black text-xl w-20">직장</span>
                </div>
                <input
                  onClick={onInputClick}
                  id="work"
                  type="text"
                  {...register("work")}
                  placeholder="권장"
                  className="rounded-md bg-gray-300 text-black outline-none p-4 flex-1"
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
                    className="text-black text-xl w-10"
                  />
                  <span className="text-black text-xl w-20">관심지역</span>
                </div>
                <input
                  onClick={onInputClick}
                  id="interested"
                  type="text"
                  {...register("interested")}
                  placeholder="선택"
                  className="rounded-md bg-gray-300 text-black outline-none p-4 flex-1"
                />
              </label>
            </li>
          </ul>
        </section>
      </form>
    </>
  );
};

export default RegionPage;
