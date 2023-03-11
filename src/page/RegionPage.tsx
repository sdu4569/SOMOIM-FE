import { useForm } from "react-hook-form";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import HeaderBackButton from "../components/HeaderBackButton";
import { Link, Outlet } from "react-router-dom";

const RegionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Outlet />
      <form action="" onSubmit={handleSubmit(onSubmit)} className="p-4">
        <PageHeader>
          <div className="flex items-center space-x-4">
            <HeaderBackButton />
            <h2 className="text-xl">내 지역</h2>
          </div>
          <div>
            <span className="text-lg">저장</span>
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
              <label htmlFor="home" className="flex justify-between space-x-4">
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={faHouseUser}
                    className="text-black w-10"
                  />
                  <span className="text-black w-20">집</span>
                </div>
                <Link to={"home"} className="flex-1">
                  <input
                    id="home"
                    type="text"
                    {...register("location", { required: true })}
                    placeholder="필수"
                    className="rounded-md bg-gray-300 text-black outline-none p-4 w-full"
                  />
                </Link>
              </label>
            </li>
            <li>
              <label htmlFor="work" className="flex justify-between space-x-4">
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-black w-10"
                  />
                  <span className="text-black w-20">직장</span>
                </div>
                <Link to={"work"} className="flex-1">
                  <input
                    id="work"
                    type="text"
                    {...register("work")}
                    placeholder="권장"
                    className="rounded-md bg-gray-300 text-black outline-none p-4 w-full"
                  />
                </Link>
              </label>
            </li>
            <li>
              <label
                htmlFor="interested"
                className="flex justify-between space-x-4"
              >
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon icon={faStar} className="text-black w-10" />
                  <span className="text-black w-20">관심지역</span>
                </div>
                <Link to={"interested"} className="flex-1">
                  <input
                    id="interested"
                    type="text"
                    {...register("interested")}
                    placeholder="선택"
                    className="rounded-md bg-gray-300 text-black outline-none p-4 w-full"
                  />
                </Link>
              </label>
            </li>
          </ul>
        </section>
      </form>
    </>
  );
};

export default RegionPage;
