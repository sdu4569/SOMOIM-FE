export const formatDate = (date: Date) => {
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
    YYYYMMDD: `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`,
  };
  return ret;
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hourNumber = parseInt(hour);
  const minuteNumber = parseInt(minute);
  const isAM = hourNumber < 12;
  const hour12 = hourNumber % 12 || 12;
  return `${isAM ? "오전" : "오후"} ${hour12}:${
    minuteNumber < 10 ? "0" : ""
  }${minuteNumber}`;
};
