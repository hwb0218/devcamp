"use client";

import { useEffect } from "react";
import { useResetRecoilState, useRecoilState } from "recoil";
import {
  orderFormAtom,
  totalDiscountPriceSelector,
  totalPriceSelector,
  type NewItemList
} from "@/recoil/orderFormAtom";

import LeftForm from "./LeftForm";
import RightForm from "./RightForm";

import calcDiscountPrice from "@/utils/calcDiscountPrice";

import type { OrderFormRes } from "../_lib/getOrderForm";

interface Props {
  orderForm: OrderFormRes;
}

export default function OrderForm({ orderForm }: Props) {
  const [form, setForm] = useRecoilState(orderFormAtom);
  const setTotalPrice = useResetRecoilState(totalPriceSelector);
  const setTotalDiscountPrice = useResetRecoilState(totalDiscountPriceSelector);

  useEffect(() => {
    const [firstCoupon] = orderForm.coupon;

    const newItemList = calcDiscountPrice(orderForm.itemList as NewItemList[], firstCoupon);

    setForm({
      ...form,
      ...orderForm,
      selectedCoupon: firstCoupon,
      itemList: newItemList
    });
    setTotalPrice();
    setTotalDiscountPrice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LeftForm />
      <RightForm />
    </>
  );
}
