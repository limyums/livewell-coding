import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";
import "./button.scss";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Livewell",
  description: "Livewell Chating App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
