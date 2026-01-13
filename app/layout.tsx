import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import { MathJaxProvider } from "@/components/MathJaxProvider";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appunti",
  description: "Appunti per gli esami universitari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${crimsonPro.variable}`}>
        <MathJaxProvider>{children}</MathJaxProvider>
      </body>
    </html>
  );
}
