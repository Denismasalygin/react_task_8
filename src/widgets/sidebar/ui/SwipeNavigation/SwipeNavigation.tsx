"use client";

import { SwipeNavigationProps } from "@/widgets/sidebar/ui/SwipeNavigation/SwipeNavigationProps.types";
import useSwipeNavigation from "@/widgets/sidebar/ui/SwipeNavigation/hooks/useSwipeNavigation";

export default function SwipeNavigation({ children, className }: SwipeNavigationProps) {
  const { handlePointerDown, handlePointerUp, handlePointerCancel } = useSwipeNavigation();

  return (
    <div
      className={className}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {children}
    </div>
  );
}
