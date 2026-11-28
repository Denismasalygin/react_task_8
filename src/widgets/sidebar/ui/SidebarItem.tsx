"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./SidebarItem.module.scss";
import { SidebarItemProps } from "@/widgets/sidebar/ui/SidebarItemProps.types";

export default function SidebarItem({ item, translationKey, collapsed }: SidebarItemProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      title={collapsed ? t(translationKey) : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <Image src={item.icon} alt="" width={24} height={24} />

      <span className={`${styles.label} ${collapsed ? styles.labelCollapsed : ""}`}>
        {t(translationKey)}
      </span>
    </Link>
  );
}
