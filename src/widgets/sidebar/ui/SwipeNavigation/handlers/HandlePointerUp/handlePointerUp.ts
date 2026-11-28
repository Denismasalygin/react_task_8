import type { RoutePath } from "../../RoutePath.types";
import { SWIPE_THRESHOLD } from "../../constantSwipe";
import { routePaths } from "../../utils/routePaths";
import { HandlePointerUpParams } from "@/widgets/sidebar/ui/SwipeNavigation/handlers/HandlePointerUp/HandlePointerUpParams.types";

export function handlePointerUp({ event, touchStart, pathname, navigate }: HandlePointerUpParams) {
  const start = touchStart.current;

  if (event.pointerType !== "touch" || !start || start.pointerId !== event.pointerId) {
    return;
  }

  touchStart.current = null;

  const deltaX = event.clientX - start.x;
  const deltaY = event.clientY - start.y;

  const isHorizontalSwipe =
    Math.abs(deltaX) >= SWIPE_THRESHOLD && Math.abs(deltaX) >= Math.abs(deltaY) * 1.3;

  if (!isHorizontalSwipe) return;

  const currentIndex = routePaths.indexOf(pathname as RoutePath);

  if (currentIndex === -1) return;

  const direction = deltaX < 0 ? 1 : -1;
  const nextIndex = currentIndex + direction;

  const isValidIndex = nextIndex >= 0 && nextIndex < routePaths.length;

  if (!isValidIndex) return;

  navigate(routePaths[nextIndex]);
}
