import Image from "next/image";
import { useState } from "react";

import Header from "./Header";
import LeftSection from "./LeftSection";

import Toggle from "@/components/toggle/Toggle";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { ItemList, type Coupon } from "../_lib/getOrderForm";

interface Props {
  coupons: Coupon[];
  itemList: ItemList[];
}

export default function Coupon({ coupons, itemList }: Props) {
  const [isToggled, setIsToggled] = useState(false);

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
        <Toggle isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        {isToggled ? (
          <span className="ml-2 text-red-500 text-xs font-semibold">최대 할인이 적용됐어요.</span>
        ) : (
          <span className="ml-2 text-xs font-semibold">최대 할인이 적용되지 않았어요. 최대 할인을 활성화 하세요.</span>
        )}
      </div>
      <ul className="my-6 [&>:not(:first-child)]:mt-8">
        {itemList.map(item => (
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
                <div className="text-sm">
                  <span>{`${item.itemPrice} / 수량 ${item.orderCount}개`}</span>
                  <span className="ml-2 font-bold text-orange-600">쿠폰적용가: 96,300원</span>
                </div>
              </div>
              <div className="flex text-sm">
                <span className="mr-2">적용 쿠폰</span>
                <span className="flex-1 text-stone-500">30% 할인 쿠폰</span>
                <span className="ml-2 font-bold">-10,700원</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between pt-[18px] mb-5 border-t border-black">
        <div className="flex pb-3">
          <LeftSection>쿠폰</LeftSection>
          <Select defaultValue="0">
            <SelectTrigger>
              <SelectValue placeholder="적용 안함" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">적용 안함</SelectItem>
              {coupons.map(coupon => (
                <SelectItem key={coupon.value} value={String(coupon.value)}>
                  {coupon.type === "fixed" ? `${coupon.value}원 할인` : `${coupon.value}% 할인`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center font-bold">
          <span className="text-xs">쿠폰 할인 금액</span>
          <span className="text-red-500">-27,340원</span>
        </div>
      </div>
    </section>
  );
}
