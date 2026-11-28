"use client";

import clsx from "clsx";
import CollapseButton from "./components/CollapseButton/CollapseButton";
import Navigation from "./components/Navigation/Navigation";
import Bottom from "./components/Bottom/Bottom";
import { useSidebarStore } from "../model/sidebar.store";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);

  function handleCollapseToggle() {
    toggleCollapsed();
  }

  return (
    <aside
      className={clsx(styles.sidebar, {
        [styles.collapsed]: collapsed,
      })}
    >
      <CollapseButton collapsed={collapsed} onToggle={handleCollapseToggle} />

      <Navigation collapsed={collapsed} />

      <Bottom collapsed={collapsed} />
    </aside>
  );
}
