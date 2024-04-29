import { PropsWithChildren } from "react";

import Wrapper from "@/components/wrapper/Wrapper";
import Breadcrumb from "./checkout/_component/Breadcrumb";

const BREADCRUMB_LIST = [
  { path: "/cart", title: "SHOPPING BAG" },
  { path: "/checkout", title: "ORDER" },
  { path: "/confirm", title: "ORDER CONFIRMED" }
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Wrapper>
      <Breadcrumb list={BREADCRUMB_LIST} />
      {children}
    </Wrapper>
  );
}
