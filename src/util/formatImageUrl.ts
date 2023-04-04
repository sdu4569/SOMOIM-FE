export default function formatImageUrl(url: string, variant: string) {
  return url.includes("imagedelivery") ? url + "/" + variant : url;
}
