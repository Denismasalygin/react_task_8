"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "../../Sidebar.module.scss";
import { CollapseButtonProps } from "@/widgets/sidebar/ui/components/CollapseButton/CollapseButtonProps.types";

export default function CollapseButton({ collapsed, onToggle }: CollapseButtonProps) {
  const collapseLabel = collapsed ? "Развернуть меню" : "Свернуть меню";

  return (
    <button
      type="button"
      className={styles.collapseButton}
      onClick={onToggle}
      aria-label={collapseLabel}
      aria-expanded={!collapsed}
    >
      <Image
        src="/icons/chevron.svg"
        alt={collapseLabel}
        width={24}
        height={24}
        className={clsx(styles.chevron, {
          [styles.chevronCollapsed]: collapsed,
        })}
      />
    </button>
  );
}
