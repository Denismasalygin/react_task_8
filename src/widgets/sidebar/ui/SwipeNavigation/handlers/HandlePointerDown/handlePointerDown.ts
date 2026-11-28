import type { PointerEvent as ReactPointerEvent } from "react";
import { SCREEN_EDGE_THRESHOLD } from "../../constantSwipe";
import { SwipeStartRef } from "@/widgets/sidebar/ui/SwipeNavigation/SwipeStartRef.types";
import { INTERACTIVE_SELECTOR } from "@/widgets/sidebar/ui/SwipeNavigation/handlers/HandlePointerDown/handlePointerDownConstant";

export function handlePointerDown(
  event: ReactPointerEvent<HTMLDivElement>,
  touchStart: SwipeStartRef,
) {
  if (event.pointerType !== "touch" || !event.isPrimary) return;

  const target = event.target;

  if (!(target instanceof Element)) return;

  const interactive = target.closest(INTERACTIVE_SELECTOR);

  if (interactive) return;

  const isNearScreenEdge =
    event.clientX <= SCREEN_EDGE_THRESHOLD ||
    event.clientX >= window.innerWidth - SCREEN_EDGE_THRESHOLD;

  if (isNearScreenEdge) return;

  touchStart.current = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
  };

  event.currentTarget.setPointerCapture(event.pointerId);
}
