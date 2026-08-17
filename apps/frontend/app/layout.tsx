import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AbleSpace Task Manager",
  description: "Technical assessment task management system"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
