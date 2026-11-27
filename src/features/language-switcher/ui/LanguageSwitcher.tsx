"use client";

import { Button } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import styles from "./LanguageSwitcher.module.scss";

type Locale = (typeof routing.locales)[number];

interface LanguageSwitcherProps {
  collapsed: boolean;
}

export default function LanguageSwitcher({ collapsed }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  const handleToggle = () => {
    const newLocale: Locale = locale === "ru" ? "en" : "ru";

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button
      className={`${styles.trigger} ${collapsed ? styles.compact : ""}`}
      onClick={handleToggle}
      aria-label={`${t("label")}: ${t(locale)}`}
      title={t(locale)}
    >
      <span className={styles.badge}>{locale.toUpperCase()}</span>

      <span className={`${styles.label} ${collapsed ? styles.labelHidden : ""}`}>{t(locale)}</span>
    </Button>
  );
}
