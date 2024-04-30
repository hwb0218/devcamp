"use client";

import Image from "next/image";
import { Fragment, useState, PropsWithChildren, ComponentProps } from "react";
import { Asterisk } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Toggle from "@/components/toggle/Toggle";

import { cn } from "@/lib/utils";

import { type OrderForm } from "../_lib/getOrderForm";

const Header = ({ children, className }: PropsWithChildren & ComponentProps<"header">) => {
  return <header className={cn("h-[74px] flex justify-between items-center", className)}>{children}</header>;
};

const LeftSection = ({ children }: PropsWithChildren) => {
  return <h2 className="flex shrink-0 items-center w-[130px] text-sm">{children}</h2>;
};

const RequiredMarker = () => {
  return <Asterisk className="w-[9px] stroke-orange-600" />;
};

interface Props {
  orderForm: OrderForm;
}

export default function LeftForm({ orderForm }: Props) {
  const [shippingInfo, setShippingInfo] = useState("기존 배송지");
  const [isToggled, setIsToggled] = useState(false);

  const coupons = [
    { label: "5000원 할인", value: 5000, type: "fixed" },
    { label: "30% 할인", value: 30, type: "percent" }
  ];

  const { shippingAddress } = orderForm;

  console.log(shippingAddress.mainPhoneNumber.split("-"));

  return (
    <div className="relative w-[55%] min-w-[530px] *:border-t-2 *:border-t-black">
      <section>
        <Header>
          <h2 className="font-bold text-lg">배송 정보</h2>
          <p className="flex items-center text-xs">
            <RequiredMarker />
            표시는 필수입력 항목
          </p>
        </Header>
        <div className="mb-5">
          <ul className="flex border-b border-stone-300 *:w-40 *:h-14 *:border *:border-stone-300 *:flex *:justify-center *:items-center *:text-xs *:cursor-pointer">
            {["기존 배송지", "신규 입력"].map(item => (
              <li
                key={item}
                onClick={() => setShippingInfo(item)}
                className={cn("relative text-zinc-400 bg-zinc-100", [
                  shippingInfo === item &&
                    "text-black bg-white after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-white"
                ])}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex pb-3">
          <LeftSection>배송지명</LeftSection>
          <Input className="max-w-[370px]" defaultValue={shippingAddress.name} />
        </div>
        <div className="flex pb-3">
          <LeftSection>
            수령인 <RequiredMarker />
          </LeftSection>
          <Input className="max-w-[370px]" defaultValue={shippingAddress.receiver} />
        </div>
        <div className="flex pb-3">
          <LeftSection>
            배송지 <RequiredMarker />
          </LeftSection>
          <Input
            defaultValue={`${shippingAddress.mainAddress} ${shippingAddress.subAddress} ${shippingAddress.zipCode}`}
          />
          <Button variant="secondary" className="ml-2">
            배송지 입력
          </Button>
        </div>
        <div className="flex pb-3 items-center">
          <LeftSection>
            연락처 <RequiredMarker />
          </LeftSection>
          {(() => {
            const phoneNumbers =
              shippingAddress.mainPhoneNumber !== "" ? shippingAddress.mainPhoneNumber.split("-") : Array(3).fill("");

            return (
              <>
                {phoneNumbers.map((num, index, arr) => (
                  <Fragment key={index}>
                    <Input className="w-[70px] px-[14px]" defaultValue={num} maxLength={4} />
                    {arr.length !== index + 1 && <span className="text-zinc-400 mx-2">-</span>}
                  </Fragment>
                ))}
              </>
            );
          })()}
        </div>
        <div className="flex pb-3">
          <LeftSection>배송 메모</LeftSection>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="배송시 요청사항을 선택해 주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="부재시 문앞에 놓아주세요.">부재시 문앞에 놓아주세요.</SelectItem>
              <SelectItem value="부재시 경비실에 맡겨 주세요.">부재시 경비실에 맡겨 주세요.</SelectItem>
              <SelectItem value="부재시 전화 또는 문자 주세요.">부재시 전화 또는 문자 주세요.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section>
        <Header className="border-b border-b-stone-300">
          <h2 className="font-bold text-lg">쿠폰 사용 및 상품 정보 / 총 1개</h2>
        </Header>
        <div className="flex items-center w-full px-4 py-[10px] bg-orange-500/20 mt-[25px]">
          <Toggle isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
          <span className="ml-2 text-red-500 text-xs font-semibold">쿠폰 할인이 적용됐어요.</span>
        </div>
        <ul className="my-6">
          <li className="flex w-full">
            <div className="mr-5 shrink-0 relative w-[170px] h-[170px]">
              <Image src="/images/product.jpg" alt="탱커 블루종" fill quality={85} className="object-cover" />
            </div>
            <div className="w-full flex flex-col justify-between">
              <div>
                <Button variant="link" className="px-0">
                  토마스모어
                </Button>
                <div className="font-bold">TD5-JP01 탱커 블루종-네이비</div>
                <div className="text-sm">옵션: Medium (100)</div>
                <div className="text-sm">
                  <span>107,000원 / 수량 1개</span>
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
