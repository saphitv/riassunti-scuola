import type { Metadata, Viewport } from "next";
import { Crimson_Pro, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { MathJaxProvider } from "@/components/MathJaxProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Appunti",
  description: "Riassunti per gli esami universitari",
  applicationName: "Appunti",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Appunti",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#14110f" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${crimsonPro.variable} ${jetbrainsMono.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            var storedTheme = localStorage.getItem("theme");
            var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            var resolvedTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;
            var root = document.documentElement;
            root.classList.toggle("dark", resolvedTheme === "dark");
            root.style.colorScheme = resolvedTheme;
          } catch {}
        `}</Script>
        <ThemeProvider>
          <MathJaxProvider>{children}</MathJaxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
