import Image from "next/image";
import { useState } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { orderFormAtom, totalDiscountPriceSelector, type NewItemList } from "@/recoil/orderFormAtom";

import Header from "./shared/Header";
import LeftSection from "./shared/LeftSection";

import Toggle from "@/components/toggle/Toggle";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";
import calcDiscountPrice from "@/utils/calcDiscountPrice";

import type { Coupon } from "../_lib/getOrderForm";

interface Props {
  selectedCoupon: Coupon;
  coupons: Coupon[];
  itemList: NewItemList[];
  totalDiscountPrice: number;
}

export default function Coupon({ selectedCoupon, coupons, itemList, totalDiscountPrice }: Props) {
  const [isToggled, setIsToggled] = useState(true);

  const setForm = useSetRecoilState(orderFormAtom);
  const setTotalDiscountPrice = useResetRecoilState(totalDiscountPriceSelector);
  const clearTotalDiscountPrice = useSetRecoilState(totalDiscountPriceSelector);

  const handleChangeCoupon = (value: string) => {
    const selectedCoupon = JSON.parse(value) as Coupon;

    const newItemList = calcDiscountPrice(itemList, selectedCoupon);

    setForm(prevForm => ({
      ...prevForm,
      selectedCoupon,
      itemList: newItemList
    }));
    setTotalDiscountPrice();
  };

  const handleToggleButton = () => {
    setIsToggled(prev => !prev);

    if (!isToggled) {
      return setTotalDiscountPrice();
    }

    clearTotalDiscountPrice(0);
  };

  return (
    <section>
      <Header className="border-b border-b-stone-300">
        <h2 className="font-bold text-lg">쿠폰 사용 및 상품 정보 / 총 1개</h2>
      </Header>
      <div
        className={cn(
          "flex items-center w-full px-4 py-[10px] mt-[25px] bg-stone-100",
          isToggled && "bg-orange-500/20"
        )}
      >
        <Toggle isToggled={isToggled} onToggle={handleToggleButton} />
        {isToggled ? (
          <span className="ml-2 text-red-500 text-xs font-semibold">쿠폰 할인이 적용됐어요.</span>
        ) : (
          <span className="ml-2 text-xs font-semibold">쿠폰이 적용되지 않았어요. 쿠폰 할인을 활성화 하세요.</span>
        )}
      </div>
      <ul className="my-6 [&>:not(:first-child)]:mt-8">
        {itemList.map(item => {
          const couponDiscountPrice = item.itemPrice * item.orderCount - item.discountPrice;
          return (
            <li key={item.itemId} className="flex w-full">
              <div className="mr-5 shrink-0 relative w-[170px] h-[170px]">
                <Image src={item.itemImage} alt={item.itemName} fill quality={85} className="object-cover" />
              </div>
              <div className="w-full flex flex-col justify-between">
                <div>
                  <Button variant="link" className="px-0">
                    {item.brandName}
                  </Button>
                  <div className="font-bold">{item.itemName}</div>
                  <div className="text-sm">옵션: {item.option}</div>
                  <div className="flex items-center text-sm">
                    <span>{`${item.itemPrice.toLocaleString()} / 수량 ${item.orderCount}개`}</span>
                    {isToggled && (
                      <span className="ml-2 font-bold text-orange-600">
                        쿠폰적용가: {item.discountPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">적용 쿠폰</span>
                  {isToggled && <span className="text-stone-500">{selectedCoupon?.label}</span>}
                  <span className={cn("ml-auto text-stone-500", isToggled && "text-black font-bold")}>
                    {isToggled ? `-${couponDiscountPrice.toLocaleString()}원` : "적용 안함"}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {isToggled && (
        <div className="flex flex-col justify-between pt-[18px] mb-5 border-t border-black">
          <div className="flex pb-3">
            <LeftSection>쿠폰</LeftSection>
            <Select value={JSON.stringify(selectedCoupon)} onValueChange={value => handleChangeCoupon(value)}>
              <SelectTrigger>
                <SelectValue placeholder="쿠폰을 선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {coupons.map(coupon => (
                  <SelectItem key={coupon.value} value={JSON.stringify(coupon)}>
                    {coupon.type === "fixed" ? `${coupon.value.toLocaleString()}원 할인` : `${coupon.value}% 할인`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span className="text-xs">쿠폰 할인 금액</span>
            <span className="text-red-500">{`-${totalDiscountPrice.toLocaleString()}원`}</span>
          </div>
        </div>
      )}
    </section>
  );
}
