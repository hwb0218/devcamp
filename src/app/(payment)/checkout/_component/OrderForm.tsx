"use client";

import useSyncOrderForm from "../_hook/useSyncOrderForm";

import LeftForm from "./LeftForm";
import RightForm from "./RightForm";

import type { OrderFormRes } from "../_lib/getOrderForm";

interface Props {
  orderForm: OrderFormRes;
}

export default function OrderForm({ orderForm }: Props) {
  useSyncOrderForm(orderForm);

  return (
    <>
      <LeftForm />
      <RightForm />
    </>
  );
}
