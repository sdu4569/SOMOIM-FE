import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";
import { useEffect, useRef } from "react";

export default function Textarea(value: any) {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const resize = useAutoResizeTextArea();

  useEffect(() => {
    resize(commentRef);
  }, [value.value]);

  return (
    <textarea
      className="p-2 rounded-md resize-none bg-blue-300 "
      disabled
      ref={commentRef}
      value={value.value}
    ></textarea>
  );
}
