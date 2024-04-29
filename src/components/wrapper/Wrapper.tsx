import { forwardRef, ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Wrapper = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("mx-auto my-0 px-12 pb-48", className)} {...props}>
      {children}
    </div>
  );
});
Wrapper.displayName = "Wrapper";

export default Wrapper;
