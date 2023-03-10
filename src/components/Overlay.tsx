interface OverlayPorps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Overlay({ children, onClick }: OverlayPorps) {
  return (
    <div
      onClick={onClick}
      className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center inset-0 z-[100]"
    >
      {children}
    </div>
  );
}
