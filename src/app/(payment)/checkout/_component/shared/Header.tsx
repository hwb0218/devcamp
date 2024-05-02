import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

const Header = ({ children, className }: PropsWithChildren & ComponentProps<"header">) => {
  return <header className={cn("h-[74px] flex justify-between items-center", className)}>{children}</header>;
};

export default Header;
