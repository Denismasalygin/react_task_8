import { notFound } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Providers from "../providers/Providers";
import { Sidebar, SwipeNavigation } from "@/widgets/sidebar";
import styles from "./layout.module.scss";
import "../globals.scss";
import { LocaleLayoutProps } from "@/app/[locale]/types/LocaleLayoutProps.types";
import { getLocaleMetadata } from "./metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  return getLocaleMetadata(locale);
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

                <SwipeNavigation className={styles.content}>{children}</SwipeNavigation>
              </div>
            </Providers>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
