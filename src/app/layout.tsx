import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import Providers from "./providers/Providers";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "react_task_8",
  description: "React application built with Next.js",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={geistSans.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
