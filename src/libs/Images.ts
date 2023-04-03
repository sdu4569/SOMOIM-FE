export const Images = {
  //관심사 이미지는 대문자로 표시
  OUTDOOR: "https://cdn-icons-png.flaticon.com/512/870/870143.png",
  EXERCISE: "https://cdn-icons-png.flaticon.com/512/2271/2271062.png",
  HUMANITIES: "https://cdn-icons-png.flaticon.com/512/3771/3771417.png",
  FOREIGN: "https://cdn-icons-png.flaticon.com/512/3269/3269821.png",
  CULTURE: "https://cdn-icons-png.flaticon.com/512/1598/1598708.png",
  MUSIC: "https://cdn-icons-png.flaticon.com/512/3659/3659784.png",
  CRAFTS: "https://cdn-icons-png.flaticon.com/512/5190/5190513.png",
  DANCE: "https://cdn-icons-png.flaticon.com/512/2402/2402478.png",
  VOLUNTEER: "https://cdn-icons-png.flaticon.com/512/9388/9388009.png",
  SOCIETY: "https://cdn-icons-png.flaticon.com/512/5231/5231460.png",
  CAR: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
  PICTURE: "https://cdn-icons-png.flaticon.com/512/2985/2985659.png",
  BASEBALL: "https://cdn-icons-png.flaticon.com/512/7107/7107583.png",
  GAME: "https://cdn-icons-png.flaticon.com/512/1374/1374723.png",
  COOK: "https://cdn-icons-png.flaticon.com/512/1027/1027128.png",
  PET: "https://cdn-icons-png.flaticon.com/512/1864/1864514.png",
  FAMILY: "https://cdn-icons-png.flaticon.com/512/3097/3097951.png",
  FREE: "https://cdn-icons-png.flaticon.com/512/891/891438.png",

  //그 외 사용하는 이미지들
  down: "https://cdn-icons-png.flaticon.com/512/152/152415.png",
  up: "https://cdn-icons-png.flaticon.com/512/3106/3106683.png",
  check: "https://cdn-icons-png.flaticon.com/512/2732/2732655.png",
  delete: "https://cdn-icons-png.flaticon.com/512/1828/1828945.png",
  location: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
  user: "https://cdn-icons-png.flaticon.com/512/2815/2815428.png",
  clubImage: "http://placehold.it/100",
  search: "https://cdn-icons-png.flaticon.com/512/1296/1296902.png",
  rightArrow: "https://cdn-icons-png.flaticon.com/512/2989/2989988.png",
  heart: "https://cdn-icons-png.flaticon.com/512/2107/2107845.png",
  camera: "https://cdn-icons-png.flaticon.com/512/3687/3687416.png",
  preview: "https://cdn-icons-png.flaticon.com/512/45/45010.png",
};

export type ImageType = keyof typeof Images;

export const imageMap = new Map(Object.entries(Images));
