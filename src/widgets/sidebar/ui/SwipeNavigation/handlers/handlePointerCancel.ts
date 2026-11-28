import type { PointerEvent as ReactPointerEvent } from "react";
import { SwipeStartRef } from "@/widgets/sidebar/ui/SwipeNavigation/SwipeStartRef.types";

export function handlePointerCancel(
  event: ReactPointerEvent<HTMLDivElement>,
  touchStart: SwipeStartRef,
) {
  if (touchStart.current?.pointerId === event.pointerId) {
    touchStart.current = null;
  }
}
