import React, { useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  container?: Element | null;
}

const PORTAL_NAME = "Portal";

const Portal = React.forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
  const { container: containerProp, children, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || (mounted && globalThis?.document?.body);
  return container
    ? createPortal(
        <div {...portalProps} ref={forwardedRef}>
          {children}
        </div>,
        container
      )
    : null;
});

Portal.displayName = PORTAL_NAME;

export default Portal;
