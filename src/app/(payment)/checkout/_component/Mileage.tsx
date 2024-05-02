import { useRecoilValue, useRecoilState } from "recoil";
import { mileageSelector, totalPriceSelector } from "@/recoil/orderFormAtom";

import Header from "./shared/Header";
import LeftSection from "./shared/LeftSection";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  availableMileage: number;
}

export default function Mileage({ availableMileage }: Props) {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const [mileage, setMileage] = useRecoilState(mileageSelector);

  return (
    <section>
      <Header>
        <h2 className="font-bold text-lg">마일리지</h2>
      </Header>
      <div className="flex pt-5 pb-10 border-t border-stone-300">
        <LeftSection className="h-10 ">사용 금액 입력</LeftSection>
        <div className="flex items-center flex-wrap">
          <div className="flex max-w-[300px]">
            <Input className="w-full" value={mileage} onChange={e => setMileage(e.target.value)} />
            <Button variant="secondary" className="ml-2 mr-4">
              모두 사용
            </Button>
          </div>
          <span className="py-[7px] text-xs">
            사용 가능 <em className="font-semibold not-italic">{(totalPrice * 0.05).toLocaleString()}P</em>
            {" / "}
            <span className="text-stone-400">
              보유 <em className="font-semibold not-italic">{availableMileage.toLocaleString()}P</em>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
