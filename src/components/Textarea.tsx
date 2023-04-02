import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";
import { useRef } from "react";

export default function Textarea(value: any) {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const _ = useAutoResizeTextArea(commentRef);
  return (
    <textarea
      className="p-2 rounded-md resize-none bg-blue-300 "
      disabled
      ref={commentRef}
      defaultValue={value.value}
    ></textarea>
  );
}
