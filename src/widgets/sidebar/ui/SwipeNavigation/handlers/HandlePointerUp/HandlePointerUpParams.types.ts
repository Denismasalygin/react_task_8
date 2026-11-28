import type { PointerEvent as ReactPointerEvent } from "react";
import { SwipeStartRef } from "@/widgets/sidebar/ui/SwipeNavigation/SwipeStartRef.types";
import type { RoutePath } from "@/widgets/sidebar/ui/SwipeNavigation/RoutePath.types";

export interface HandlePointerUpParams {
  event: ReactPointerEvent<HTMLDivElement>;
  touchStart: SwipeStartRef;
  pathname: string;
  navigate: (path: RoutePath) => void;
}
