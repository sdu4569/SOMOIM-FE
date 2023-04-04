export default function isNewClub(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60; // 1 hour;
}
