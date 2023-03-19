import {
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLocation, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";

interface CreateActivityForm {
  name: string;
  date: Date;
  time: string;
  location: string;
  money: string;
  maxMember: number;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const dayOfWeekLabel = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
  const ret = {
    year,
    month,
    day,
    dayOfWeek,
    dayOfWeekLabel: `${dayOfWeekLabel}요일`,
    YYYYMMDD: `${year}-${month}-${day}`,
  };
  return ret;
};

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hourNumber = parseInt(hour);
  const minuteNumber = parseInt(minute);
  const isAM = hourNumber < 12;
  const hour12 = hourNumber % 12 || 12;
  return `${isAM ? "오전" : "오후"} ${hour12}:${
    minuteNumber < 10 ? "0" : ""
  }${minuteNumber}`;
};

export default function CreateActivity() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<CreateActivityForm>({
    defaultValues: {
      time: "19:00",
      maxMember: 20,
    },
  });

  return (
    <div className="overflow-scroll h-full p-4">
      <PageHeader className="!bg-gray-100">
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1>C.A 스케줄 추가</h1>
        </div>
      </PageHeader>
      <section className="mt-12">
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="flex flex-col space-y-4"
        >
          <label htmlFor="name" className="flex items-center">
            <input
              type="text"
              id="name"
              className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
              placeholder="C.A 제목을 입력하세요."
              {...register("name", { required: true })}
            />
          </label>
          <div className="justify-between flex">
            <div className="flex flex-col space-y-4 w-full">
              <label htmlFor="date" className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faCalendar} size="xl" className="w-6" />
                <div className="flex-1">
                  <Controller
                    control={control}
                    name="date"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        id="date"
                        placeholderText="12월 31일 (일)"
                        className="rounded-md p-2 bg-gray-100 w-full outline-none"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        locale={ko}
                        dateFormat="MM월 dd일 (EEE)"
                        minDate={new Date()}
                      />
                    )}
                  />
                </div>
              </label>
              <label htmlFor="time" className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faClock} size="xl" className="w-6" />
                <input
                  type="time"
                  id="time"
                  className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                  {...register("time", { required: true })}
                />
              </label>
            </div>
            <div className="border ml-8 w-32 text-gray-400 rounded-md p-2 flex flex-col justify-center items-center">
              <p className="text-sm">
                {watch("date")
                  ? formatDate(watch("date")).dayOfWeekLabel
                  : "일요일"}
              </p>
              <p className="text-2xl">
                {watch("date") ? formatDate(watch("date")).day : "31"}
              </p>
              <p className="text-xs">{formatTime(watch("time"))}</p>
            </div>
          </div>
          <label htmlFor="location" className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faLocation} size="xl" className="w-6" />
            <input
              placeholder="위치를 입력하세요."
              type="text"
              id="location"
              className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
              {...register("location", { required: true })}
            />
          </label>
          <label htmlFor="money" className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faWonSign} size="xl" className="w-6" />
            <input
              placeholder="식사비 15000원"
              type="text"
              id="money"
              className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
              {...register("money", { required: true })}
            />
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} size="2xl" />
              <p>정원(5 ~ 300명)</p>
            </div>
            <input
              type="number"
              {...register("maxMember", { required: true, min: 5, max: 300 })}
              className="p-2 rounded-md bg-gray-100 outline-none w-16 appearance-none text-center"
            />
          </label>
          <Button
            className={`w-full ${!isValid && "!bg-gray-500 cursor-default"}`}
          >
            C.A 스케줄 추가
          </Button>
        </form>
      </section>
    </div>
  );
}
