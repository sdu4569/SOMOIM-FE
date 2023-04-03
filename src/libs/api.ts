import { API_ENDPOINT } from "./../App";

export const getUploadURL = async (): Promise<string> => {
  const response = await fetch(`${API_ENDPOINT}/upload-url`);
  const {
    data: { url },
  } = await response.json();
  return url;
};

export const uploadImageToURL = async (file: File, uploadURL: string) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(uploadURL, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();

  return result;
};
