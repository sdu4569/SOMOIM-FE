import { RefObject, useState } from "react";
import { useEffect } from "react";

export default function useAutoResizeTextArea(
  ref: RefObject<HTMLTextAreaElement>
) {
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "0";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      setHeight(ref.current.scrollHeight);
    }
  }, [ref]);

  return height;
}
