import { Images } from "@/libs/Images";
export default function formatImageUrl(url: string, variant: string) {
  if (!url) {
    return "/icon-192x192.png";
  }
  return url.includes("imagedelivery") ? url + "/" + variant : url;
}
