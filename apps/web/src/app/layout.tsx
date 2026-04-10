import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사주",
  description: "사주를 통해 미래를 예측해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
