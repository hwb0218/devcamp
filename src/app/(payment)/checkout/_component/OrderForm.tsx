"use client";

import { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { NewItemList, orderFormAtom, totalDiscountPriceSelector, totalPriceSelector } from "@/recoil/orderFormAtom";

import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
// import { type OrderForm } from "../_lib/getOrderForm";
import type { OrderFormRes } from "../_lib/getOrderForm";

import calcDiscountPrice from "@/utils/calcDiscountPrice";

interface Props {
  orderForm: OrderFormRes;
}

export default function OrderForm({ orderForm }: Props) {
  const setForm = useSetRecoilState(orderFormAtom);
  const setTotalPrice = useResetRecoilState(totalPriceSelector);
  const setTotalDiscountPrice = useResetRecoilState(totalDiscountPriceSelector);

  useEffect(() => {
    const [firstCoupon] = orderForm.coupon;

    const newItemList = calcDiscountPrice(orderForm.itemList as NewItemList[], firstCoupon);

    setForm({
      ...orderForm,
      selectedCoupon: firstCoupon,
      itemList: newItemList,
      mileage: "",
      totalPrice: 0,
      totalDiscountPrice: 0
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
