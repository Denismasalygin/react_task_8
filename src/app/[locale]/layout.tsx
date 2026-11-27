import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import Providers from "../providers/Providers";

import { Sidebar } from "@/widgets/sidebar";

import styles from "./layout.module.scss";

import "../globals.scss";

export const metadata: Metadata = {
  title: "React Task 8",
  description: "Система управления сотрудниками",
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Providers>
              <div className={styles.app}>
                <Sidebar />

                <main className={styles.content}>{children}</main>
              </div>
            </Providers>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
