"use client";

import { useRecoilValue } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

import Header from "./Header";
import LeftSection from "./LeftSection";
import ShippingInfo from "./ShippingInfo";
import Coupon from "./Coupon";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LeftForm() {
  const orderForm = useRecoilValue(orderFormAtom);
  const { shippingAddress, coupon, itemList } = orderForm;

  return (
    <div className="relative w-[55%] min-w-[530px] *:border-t-2 *:border-t-black">
      <ShippingInfo shippingAddress={shippingAddress} />
      <Coupon coupons={coupon} itemList={itemList} />
      <section>
        <Header>
          <h2 className="font-bold text-lg">마일리지</h2>
        </Header>
        <div className="flex pt-5 pb-10">
          <LeftSection>사용 금액 입력</LeftSection>
          <div className="flex items-center flex-wrap">
            <div className="flex max-w-[300px]">
              <Input className="w-full" defaultValue={0} />
              <Button variant="secondary" className="ml-2 mr-4">
                모두 사용
              </Button>
            </div>
            <span className="py-[7px] text-xs">
              사용 가능 <em className="font-semibold not-italic">1,234P</em>
              {" / "}
              <span className="text-stone-400">
                보유 <em className="font-semibold not-italic">1,234P</em>
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
