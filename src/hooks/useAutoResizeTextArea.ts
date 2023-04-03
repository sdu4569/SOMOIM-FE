import { RefObject, useState } from "react";
import { useEffect } from "react";

export default function useAutoResizeTextArea() {
  const [height, setHeight] = useState<number>(0);

  const autoResizeTextArea = (ref: RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "0";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      setHeight(ref.current.scrollHeight);
    }
  };

  return autoResizeTextArea;
}
