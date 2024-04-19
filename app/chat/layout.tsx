import Menu from "../../components/Menu/menu";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>{children}</main>
    </>
  );
}
