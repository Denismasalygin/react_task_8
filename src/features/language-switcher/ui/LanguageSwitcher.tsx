"use client";

import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./LanguageSwitcher.module.scss";
import type { LanguageSwitcherProps } from "../ui/LanguageSwitcherProps.types";
import useLanguageSwitcher from "@/features/language-switcher/hooks/useLanguageSwitcher";
import clsx from "clsx";

export default function LanguageSwitcher({ collapsed }: LanguageSwitcherProps) {
  const { locale, handleToggle } = useLanguageSwitcher();
  const t = useTranslations("LanguageSwitcher");

  return (
    <Button
      className={styles.trigger}
      onClick={handleToggle}
      aria-label={`${t("label")}: ${t(locale)}`}
      title={t(locale)}
    >
      <span className={styles.badge}>{locale.toUpperCase()}</span>

      <span
        className={clsx(styles.label, {
          [styles.labelHidden]: collapsed,
        })}
      >
        {t(locale)}
      </span>
    </Button>
  );
}
