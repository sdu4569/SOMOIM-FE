import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
export const InterestList = [
  {
    title: "아웃도어/여행",
    image: "https://cdn-icons-png.flaticon.com/512/870/870194.png",
    detail: [
      "등산",
      "산책/트래킹",
      "캠핑/백패킹",
      "국내여행",
      "해외여행",
      "낚시",
      "패러글라이딩",
    ],
  },
  {
    title: "운동/스포츠",
    image: "https://cdn-icons-png.flaticon.com/512/2271/2271062.png",
    detail: [
      "자전거",
      "배드민턴",
      "볼링",
      "테니스/스쿼시",
      "스키/보드",
      "골프",
      "클라이밍",
      "다이어트",
      "헬스/크로스핏",
      "요가/필라테스",
      "탁구",
      "당구/포켓볼",
      "러닝/마라톤",
      "수영/스쿠버다이빙",
      "서핑/웨이크보드/요트",
      "축구/풋살",
      "농구",
      "야구",
      "배구",
      "승마",
      "펜싱",
      "복싱",
      "태권도/유도",
      "검도",
      "무술/주짓수",
      "스케이트/인라인",
      "크루즈보드",
      "족구",
      "양궁",
    ],
  },
  {
    title: "인문학/책/글",
    image: "https://cdn-icons-png.flaticon.com/512/3771/3771417.png",
    detail: [
      "책/독서",
      "인문학",
      "심리학",
      "철학",
      "역사",
      "시사/경제",
      "작문/글쓰기",
    ],
  },
  {
    title: "외국/언어",
    image: "https://cdn-icons-png.flaticon.com/512/4459/4459205.png",
    detail: ["영어", "일본어", "중국어", "프랑스어", "스페인어", "러시아어"],
  },
  {
    title: "문화/공연/축제",
    image: "https://cdn-icons-png.flaticon.com/512/1598/1598759.png",
    detail: [
      "뮤지컬/오페라",
      "공연/연극",
      "영화",
      "전시회",
      "연기/공연제작",
      "고궁/문화재탐방",
      "파티/페스티벌",
    ],
  },
  {
    title: "음악/악기",
    image: "https://cdn-icons-png.flaticon.com/512/876/876817.png",
    detail: [""],
  },
  {
    title: "공예/만들기",
    image: "https://cdn-icons-png.flaticon.com/512/3339/3339074.png",
  },
  {
    title: "댄스/무용",
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048356.png",
  },
  {
    title: "봉사활동",
    image: "https://cdn-icons-png.flaticon.com/512/7959/7959306.png",
  },
  {
    title: "사교/인맥",
    image: "https://cdn-icons-png.flaticon.com/512/5231/5231460.png",
  },
  {
    title: "차/오토바이",
    image: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
  },
  {
    title: "사진/영상",
    image: "https://cdn-icons-png.flaticon.com/512/3004/3004666.png",
  },
  {
    title: "야구관람",
    image: "https://cdn-icons-png.flaticon.com/512/7107/7107583.png",
  },
  {
    title: "게임/오락",
    image: "https://cdn-icons-png.flaticon.com/512/1374/1374723.png",
    detail: [
      "다트",
      "보드게임",
      "두뇌심리게임",
      "온라인게임",
      "콘솔게임",
      "단체놀이",
      "타로카드",
      "마술",
      "바둑",
    ],
  },
  {
    title: "요리/제조",
    image: "https://cdn-icons-png.flaticon.com/512/9823/9823451.png",
  },
  {
    title: "반려동물",
    image: "https://cdn-icons-png.flaticon.com/512/1864/1864640.png",
  },
  {
    title: "가족/결혼",
    image: "https://cdn-icons-png.flaticon.com/512/3097/3097951.png",
  },
  {
    title: "자유주제",
    image: "https://cdn-icons-png.flaticon.com/512/575/575927.png",
  },
];

const InterestPage = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }

    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("checkedList:", checkedList);
    },
    [checkedList]
  );

  return (
    <div className="relative">
      <h2 className="max-w-4xl  m-auto pl-3 mb-5 mt-5 text-xl font-bold">
        관심사 선택
      </h2>

      <form onSubmit={onSubmit}>
        <div className="flex justify-evenly flex-wrap">
          {InterestList.map((item, idx) => {
            return (
              <div key={idx} className="min-w-80 mb-3 ">
                <input
                  type="checkbox"
                  id={item.title}
                  checked={checkedList.includes(item.title)}
                  onChange={(e) => checkHandler(e, item.title)}
                  className=" checked:bg-blue-500"
                />
                <label htmlFor={item.title} className="">
                  <img
                    src={item.image}
                    className=" m-auto mb-2 w-12 bg-white checked:bg-gray-500"
                  />
                  <div className="text-10 text-center">{item.title}</div>
                </label>
              </div>
            );
          })}
        </div>
        <Link to={"/interest/detail"} state={checkedList}>
          <button type="submit" className="mr-3 absolute top-0 right-0">
            다음
          </button>
        </Link>
      </form>
    </div>
  );
};

export default InterestPage;
