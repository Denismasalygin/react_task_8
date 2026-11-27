"use client";

import Image from "next/image";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import type { NavigationLink } from "../config/navigationLink.types";

import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: NavigationLink;
  translationKey: string;
  collapsed: boolean;
}

export default function SidebarItem({ item, translationKey, collapsed }: SidebarItemProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      title={collapsed ? t(translationKey) : undefined}
    >
      <Image src={item.icon} alt="" width={24} height={24} />
      {!collapsed && <span>{t(translationKey)}</span>}
    </Link>
  );
}
