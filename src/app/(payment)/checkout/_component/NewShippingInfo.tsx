import { Fragment } from "react";

import LeftSection from "./LeftSection";
import RequiredMarker from "./RequiredMarker";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewShippingInfo() {
  return (
    <div className="pb-[30px]">
      <div className="flex pb-3">
        <LeftSection>배송지명</LeftSection>
        <Input className="max-w-[370px]" />
      </div>
      <div className="flex pb-3">
        <LeftSection>
          수령인 <RequiredMarker />
        </LeftSection>
        <Input className="max-w-[370px]" />
      </div>
      <div className="flex pb-3">
        <LeftSection>
          배송지 <RequiredMarker />
        </LeftSection>
        <Input />
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
          .map((num, index, arr) => (
            <Fragment key={index}>
              <Input className="w-[70px] px-[14px]" defaultValue={num} maxLength={4} />
              {arr.length !== index + 1 && <span className="text-zinc-400 mx-2">-</span>}
            </Fragment>
          ))}
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
  );
}
