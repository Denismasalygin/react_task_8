import { RoutePath } from "@/widgets/sidebar/ui/SwipeNavigation/RoutePath.types";
import { navigationLinks } from "@/widgets/sidebar/config/navigation";

export const routePaths: RoutePath[] = Object.values(navigationLinks).map((item) => item.path);
