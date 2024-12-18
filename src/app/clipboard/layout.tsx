import BottomNav from "@/components/bottom-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-grow">{children}</main>

      {/* <AddToClipboard /> */}
      <BottomNav />
    </>
  );
}
