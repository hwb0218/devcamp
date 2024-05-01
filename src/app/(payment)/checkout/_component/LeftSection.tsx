import { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const LeftSection = ({ children, className }: PropsWithChildren & ComponentProps<"h2">) => {
  return <h2 className={cn("flex shrink-0 items-center w-[130px] text-sm", className)}>{children}</h2>;
};

export default LeftSection;
