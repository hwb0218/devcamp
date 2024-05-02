import { useState, Fragment, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

import Header from "./shared/Header";
import LeftSection from "./shared/LeftSection";
import NewShippingInfo from "./NewShippingInfo";
import RequiredMarker from "./shared/RequiredMarker";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { uuid } from "@/utils/uuid";

import { ShippingAddress } from "../_lib/getOrderForm";

interface Props {
  shippingAddress: ShippingAddress;
}

export default function ShippingInfo({ shippingAddress }: Props) {
  const [shippingInfo, setShippingInfo] = useState("기존 배송지");
  const setForm = useSetRecoilState(orderFormAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prevForm => ({
      ...prevForm,
      shippingAddress: {
        ...prevForm.shippingAddress,
        [name]: value
      }
    }));
  };

  const handlePhoneNumber = () => {
    // const { name, value } = e.target;
    // setTel(prevTel => ({
    //   ...prevTel,
    //   [name]: value
    // }));
  };

  return (
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
      {shippingInfo === "기존 배송지" ? (
        <div className="pb-[30px]">
          <div className="flex pb-3">
            <LeftSection>배송지명</LeftSection>
            <Input className="max-w-[370px]" value={shippingAddress.name} name="name" onChange={handleChange} />
          </div>
          <div className="flex pb-3">
            <LeftSection>
              수령인 <RequiredMarker />
            </LeftSection>
            <Input className="max-w-[370px]" value={shippingAddress.receiver} name="receiver" onChange={handleChange} />
          </div>
          <div className="flex pb-3">
            <LeftSection>
              배송지 <RequiredMarker />
            </LeftSection>
            <Input value={shippingAddress.address} name="address" onChange={handleChange} />
            <Button variant="secondary" className="ml-2">
              배송지 입력
            </Button>
          </div>
          <div className="flex pb-3 items-center">
            <LeftSection>
              연락처 <RequiredMarker />
            </LeftSection>
            {Array(3)
              .fill("")
              .map((_, index, arr) => {
                const num = shippingAddress.mainPhoneNumber.split("-")[index] ?? "";
                return (
                  <Fragment key={uuid()}>
                    <Input
                      className="w-[70px] px-[14px]"
                      value={num}
                      name={`tel.${index}`}
                      onChange={handlePhoneNumber}
                      maxLength={4}
                    />
                    {arr.length !== index + 1 && <span className="text-zinc-400 mx-2">-</span>}
                  </Fragment>
                );
              })}
          </div>
          <div className="flex">
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
        </div>
      ) : (
        <NewShippingInfo />
      )}
    </section>
  );
}
