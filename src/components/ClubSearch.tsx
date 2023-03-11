import { useEffect } from "react";
import { Link } from "react-router-dom";
import { InterestList } from "../libs/InterestList";
import { Images } from "../libs/Images";

const ClubSearch = () => {
  useEffect(() => {
    let classList = document.querySelector(".detailinfo")?.classList;

    document
      .querySelector(".btn_open")
      ?.addEventListener("click", function (e: any) {
        classList?.remove("max-h-120");
        e.target.classList.add("hidden");
        document.querySelector(".btn_close")?.classList.remove("hidden");
        document.querySelector(".btn_close")?.classList.add("block");
      });

    document
      .querySelector(".btn_close")
      ?.addEventListener("click", function (e: any) {
        classList?.add("max-h-120");
        e.target.classList.add("hidden");
        document.querySelector(".btn_open")?.classList.remove("hidden");
        document.querySelector(".btn_open")?.classList.add("block");
      });
  }, []);

  return (
    <>
      <div className="detailinfo mb-2.5 max-h-120 overflow-hidden">
        <div className="flex justify-evenly flex-wrap">
          {InterestList.map((item, idx) => {
            return (
              <div key={idx} className="w-70 mb-2.5 ">
                <Link to={`/${item.interest}`} className="m-0">
                  <img
                    src={item.image}
                    alt="관심사 이미지"
                    className="border-2 border-solid rounded w-8 m-auto mb-2 bg-gray-200  "
                  />
                  <div className="text-10 text-center">{item.title}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <a href="#" className="btn_open text-10 block w-11 m-auto">
        더보기
        <img src={Images.down} alt="아래 화살표" className="w-2 float-right" />
      </a>
      <a href="#" className="btn_close text-10 w-11 m-auto hidden">
        감추기
        <img src={Images.up} alt="아래 화살표" className="w-2 float-right" />
      </a>
    </>
  );
};

export default ClubSearch;
