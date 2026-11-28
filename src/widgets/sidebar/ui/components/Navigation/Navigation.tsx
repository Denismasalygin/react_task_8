import { navigationLinks } from "../../../config/navigation";
import SidebarItem from "../../SidebarItem";
import styles from "../../Sidebar.module.scss";
import { NavigationProps } from "@/widgets/sidebar/ui/components/Navigation/NavigationProps.types";

export default function Navigation({ collapsed }: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      {Object.entries(navigationLinks).map(([key, item]) => (
        <SidebarItem key={key} item={item} translationKey={key} collapsed={collapsed} />
      ))}
    </nav>
  );
}
