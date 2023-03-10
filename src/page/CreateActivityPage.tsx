import {
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLocation, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import HeaderBackButton from "../components/HeaderBackButton";
import PageHeader from "../components/PageHeader";

interface CreateActivityForm {
  name: string;
  date: string;
  time: string;
  location: string;
  money: string;
  maxMember: number;
}

export default function CreateActivity() {
  const { register, handleSubmit } = useForm<CreateActivityForm>();

  return (
    <div className="overflow-scroll h-full p-4">
      <PageHeader className="!bg-gray-300">
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1>C.A 스케줄 추가</h1>
        </div>
      </PageHeader>
      <section className="mt-12">
        <form action="" className="flex flex-col space-y-4">
          <label htmlFor="name" className="flex items-center">
            <input
              type="text"
              id="name"
              className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
              placeholder="C.A 제목을 입력하세요."
              {...register("name")}
            />
          </label>
          <div className="justify-between flex">
            <div className="flex flex-col space-y-4 w-full">
              <label htmlFor="date" className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faCalendar} size="xl" className="w-6" />
                <input
                  placeholder="12월 31일 (일)"
                  type="text"
                  id="date"
                  className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
                  {...register("date")}
                />
              </label>
              <label htmlFor="time" className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faClock} size="xl" className="w-6" />
                <input
                  placeholder="오후 7:00"
                  type="text"
                  id="time"
                  className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
                  {...register("time")}
                />
              </label>
            </div>
            <div className="border ml-8 w-32 text-gray-400 rounded-md p-2 flex flex-col justify-center items-center">
              <p className="text-sm">일요일</p>
              <p className="text-2xl">31</p>
              <p className="text-xs">오후 7:00</p>
            </div>
          </div>
          <label htmlFor="location" className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faLocation} size="xl" className="w-6" />
            <input
              placeholder="위치를 입력하세요."
              type="text"
              id="location"
              className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
              {...register("location")}
            />
          </label>
          <label htmlFor="money" className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faWonSign} size="xl" className="w-6" />
            <input
              placeholder="식사비 15000원"
              type="text"
              id="money"
              className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
              {...register("money")}
            />
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} size="2xl" />
              <p>정원(5 ~ 300명)</p>
            </div>
            <input
              defaultValue={20}
              type="number"
              className="p-2 none rounded-md bg-gray-300 outline-none w-16 appearance-none text-center"
            />
          </label>
          <Button className="w-full">C.A 스케줄 추가</Button>
        </form>
      </section>
    </div>
  );
}
