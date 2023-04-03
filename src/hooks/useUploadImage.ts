import { getUploadURL, uploadImageToURL } from "@/libs/api";
import { useState } from "react";

export default function useUploadImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    let result, ret;
    try {
      const uploadURL = await getUploadURL();
      result = await uploadImageToURL(file, uploadURL);
      ret = `https://imagedelivery.net/a9xaKxLjpK4A_4a8CoEUJg/${result.result.id}`;
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);

    return ret;
  };

  return { uploadImage, isLoading, error };
}
