"use client";

import { useState } from "react";
import type { MouseEventHandler } from "react";

import ContextMenu from "./shared/ContextMenu";

import { Button } from "@/components/ui/button";

const INITIAL_CONTEXT_MENU = {
  show: false,
  mousePos: {
    x: 0,
    y: 0
  }
};

const TestContext = () => {
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);

  const handleContextMenu: MouseEventHandler = e => {
    e.preventDefault();
    // 브라우저 상에서 현재 마우스 포인터의 x,y축 좌표를 구함.
    const { pageX, pageY } = e;
    setContextMenu({ show: true, mousePos: { x: pageX, y: pageY } });
  };

  const closeContextMenu = () => {
    setContextMenu(INITIAL_CONTEXT_MENU);
  };

  return (
    <>
      <Button onContextMenu={handleContextMenu}>컨텍스트 테스트 버튼</Button>
      {contextMenu.show && (
        <ContextMenu mousePos={contextMenu.mousePos} closeContextMenu={closeContextMenu}>
          컨텍스트 메뉴입니다.
        </ContextMenu>
      )}
    </>
  );
};

export default TestContext;
