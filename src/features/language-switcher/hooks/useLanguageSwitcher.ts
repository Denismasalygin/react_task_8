"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "@/features/language-switcher/ui/Locale.types";

export default function useLanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => {
    const newLocale: Locale = locale === "ru" ? "en" : "ru";

    router.replace(pathname, { locale: newLocale });
  };

  return {
    locale,
    handleToggle,
  };
}
