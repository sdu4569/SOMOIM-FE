export default function formatDate(date: string): string {
  const dateNum = new Date(date).getTime();
  const now = new Date().getTime();

  const diff = now - dateNum;

  if (diff < 1000 * 60) {
    return "방금 전";
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}분 전`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  } else if (diff < 1000 * 60 * 60 * 24 * 14) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}일 전`;
  } else {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    return `${year}년 ${month}월 ${day}일`;
  }
}
