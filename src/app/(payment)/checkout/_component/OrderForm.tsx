"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

import LeftForm from "./LeftForm";
import RightForm from "./RightForm";

import { type OrderForm } from "../_lib/getOrderForm";

interface Props {
  orderForm: OrderForm;
}

export default function OrderForm({ orderForm }: Props) {
  const setForm = useSetRecoilState(orderFormAtom);

  useEffect(() => {
    setForm(orderForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LeftForm />
      <RightForm />
    </>
  );
}
