import type { NavigationLink } from "@/widgets/sidebar/config/navigationLink.types";

export interface SidebarItemProps {
  item: NavigationLink;
  translationKey: string;
  collapsed: boolean;
}
