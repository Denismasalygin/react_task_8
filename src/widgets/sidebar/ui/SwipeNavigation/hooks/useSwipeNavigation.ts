"use client";

import { useCallback, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { SwipeStart } from "../SwipeStart.types";
import { handlePointerDown as onPointerDown } from "../handlers/HandlePointerDown/handlePointerDown";
import { handlePointerUp as onPointerUp } from "../handlers/HandlePointerUp/handlePointerUp";
import { handlePointerCancel as onPointerCancel } from "../handlers/handlePointerCancel";

export default function useSwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const touchStart = useRef<SwipeStart | null>(null);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown(event, touchStart);
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp({
        event,
        touchStart,
        pathname,
        navigate: (path) => router.push(path),
      });
    },
    [pathname, router],
  );

  const handlePointerCancel = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    onPointerCancel(event, touchStart);
  }, []);

  return {
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
  };
}
