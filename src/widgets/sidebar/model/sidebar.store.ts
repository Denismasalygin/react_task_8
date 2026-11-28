import { create } from "zustand";
import { SidebarState } from "@/widgets/sidebar/model/SidebarState.types";

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,

  toggleCollapsed: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
}));
