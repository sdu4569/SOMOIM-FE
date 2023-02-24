interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={`bg-white w-[400px] h-screen rounded-md p-4 relative ${className}`}
    >
      {children}
    </div>
  );
}
