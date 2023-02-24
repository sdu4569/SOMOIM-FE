export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-[400px] h-screen rounded-md p-4">{children}</div>
  );
}
