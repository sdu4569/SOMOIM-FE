import { RefObject, useEffect, useRef, useState } from "react";
export default function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverInit
) {
  const [intersecting, setIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, options]);

  return intersecting;
}
