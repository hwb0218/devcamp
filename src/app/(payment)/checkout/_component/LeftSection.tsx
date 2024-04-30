import { PropsWithChildren } from "react";

const LeftSection = ({ children }: PropsWithChildren) => {
  return <h2 className="flex shrink-0 items-center w-[130px] text-sm">{children}</h2>;
};

export default LeftSection;
