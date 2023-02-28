interface OverlayPorps {
  children?: React.ReactNode;
}

export default function Overlay({ children }: OverlayPorps) {
  return (
    <div className="absolute w-full h-full bg-black opacity-30 inset-0 z-[100]">
      {children}
    </div>
  );
}
