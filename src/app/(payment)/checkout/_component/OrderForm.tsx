"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { NewItemList, orderFormAtom } from "@/recoil/orderFormAtom";

import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import { type OrderForm } from "../_lib/getOrderForm";

import calcDiscountPrice from "@/utils/calcDiscountPrice";

interface Props {
  orderForm: OrderForm;
}

export default function OrderForm({ orderForm }: Props) {
  const setForm = useSetRecoilState(orderFormAtom);

  useEffect(() => {
    const selectedCoupon = orderForm.coupon[0];

    const newItemList = calcDiscountPrice(orderForm.itemList as NewItemList[], selectedCoupon);

    setForm({
      ...orderForm,
      selectedCoupon,
      itemList: newItemList
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LeftForm />
      <RightForm />
    </>
  );
}
