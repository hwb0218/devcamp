import { useEffect } from "react";
import {
  orderFormAtom,
  totalDiscountPriceSelector,
  totalPriceSelector,
  type NewItemList
} from "@/recoil/orderFormAtom";
import { useRecoilState, useResetRecoilState } from "recoil";

import calcDiscountPrice from "@/utils/calcDiscountPrice";

import type { OrderFormRes } from "../_lib/getOrderForm";

export default function useSyncOrderForm(orderForm: OrderFormRes) {
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
}
