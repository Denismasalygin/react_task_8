"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { navigationLinks } from "../config/navigation";
import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import LanguageSwitcher from "@/features/language-switcher/ui/LanguageSwitcher";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const t = useTranslations("Profile");

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button
        type="button"
        className={styles.collapseButton}
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
      >
        <Image
          src="/icons/chevron.svg"
          alt=""
          width={24}
          height={24}
          className={`${styles.chevron} ${collapsed ? styles.chevronCollapsed : ""}`}
        />
      </button>

      <nav className={styles.navigation}>
        {Object.entries(navigationLinks).map(([key, item]) => (
          <SidebarItem key={key} item={item} translationKey={key} collapsed={collapsed} />
        ))}
      </nav>

      <div className={styles.bottom}>
        <LanguageSwitcher collapsed={collapsed} />

        <div className={styles.profile}>
          <div className={styles.avatar}>П</div>

          <span className={`${collapsed ? styles.profileLabelHidden : styles.profileLabel}`}>
            {t("title")}
          </span>
        </div>
      </div>
    </aside>
  );
}
