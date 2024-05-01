"use client";

import { useRecoilValue } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

import ShippingInfo from "./ShippingInfo";
import Coupon from "./Coupon";
import Mileage from "./Mileage";

import { type Coupon as CouponType } from "../_lib/getOrderForm";

export default function LeftForm() {
  const orderForm = useRecoilValue(orderFormAtom);
  const { shippingAddress, coupon, itemList } = orderForm;
  const selectedCoupon = orderForm.selectedCoupon as CouponType;

  return (
    <div className="relative w-[55%] min-w-[530px] *:border-t-2 *:border-t-black">
      <ShippingInfo shippingAddress={shippingAddress} />
      <Coupon selectedCoupon={selectedCoupon} coupons={coupon} itemList={itemList} />
      <Mileage />
    </div>
  );
}
