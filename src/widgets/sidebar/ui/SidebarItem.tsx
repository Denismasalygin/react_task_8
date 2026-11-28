"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { SidebarItemProps } from "@/widgets/sidebar/ui/SidebarItemProps.types";
import styles from "./SidebarItem.module.scss";

export default function SidebarItem({ item, translationKey, collapsed }: SidebarItemProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const isActive = pathname === item.path;
  const label = t(translationKey);

  return (
    <Link
      href={item.path}
      className={clsx(styles.item, {
        [styles.active]: isActive,
      })}
      title={collapsed ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <Image src={item.icon} alt={label} width={24} height={24} />

      <span
        aria-hidden="true"
        className={clsx(styles.label, {
          [styles.labelCollapsed]: collapsed,
        })}
      >
        {label}
      </span>
    </Link>
  );
}
