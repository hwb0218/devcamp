"use client";

import type { PropsWithChildren } from "react";

import useOnClickOutside from "../../_hook/useOnClickOutside";

import { cn } from "@/lib/utils";
import Portal from "./Portal";

interface Props {
  mousePos: {
    x: number;
    y: number;
  };
  closeContextMenu: () => void;
}

const ContextMenu = ({ mousePos, children, closeContextMenu }: PropsWithChildren<Props>) => {
  const { ref: contextMenuRef } = useOnClickOutside<HTMLDivElement>(closeContextMenu);

  return (
    <Portal>
      <div
        ref={contextMenuRef}
        style={{ top: `${mousePos.y}px`, left: `${mousePos.x}px` }}
        className={cn("absolute z-20")}
      >
        {children}
      </div>
    </Portal>
  );
};

export default ContextMenu;
