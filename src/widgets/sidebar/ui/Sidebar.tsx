"use client";

import { useState } from "react";
import clsx from "clsx";
import CollapseButton from "./components/CollapseButton/CollapseButton";
import Navigation from "./components/Navigation/Navigation";
import Bottom from "./components/Bottom/Bottom";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  function handleCollapseToggle() {
    setCollapsed(!collapsed);
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
