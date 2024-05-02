import { useRecoilState } from "recoil";
import { mileageSelector } from "@/recoil/orderFormAtom";

import Header from "./shared/Header";
import LeftSection from "./shared/LeftSection";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  availableMileage: number;
  totalPrice: number;
}

export default function Mileage({ availableMileage, totalPrice }: Props) {
  const [mileage, setMileage] = useRecoilState(mileageSelector);

  const usableMileage = totalPrice * 0.05;

  const handleClickButton = () => {
    setMileage(String(usableMileage));
  };

  return (
    <section>
      <Header>
        <h2 className="font-bold text-lg">마일리지</h2>
      </Header>
      <div className="flex pt-5 pb-10 border-t border-stone-300">
        <LeftSection className="h-10 ">사용 금액 입력</LeftSection>
        <div className="flex items-center flex-wrap">
          <div className="flex max-w-[300px]">
            <Input
              className="w-full"
              value={Number(mileage).toLocaleString()}
              onChange={e => setMileage(e.target.value)}
            />
            <Button variant="secondary" onClick={handleClickButton} className="ml-2 mr-4">
              모두 사용
            </Button>
          </div>
          <span className="py-[7px] text-xs">
            사용 가능 <em className="font-semibold not-italic">{usableMileage.toLocaleString()}P</em>
            {" / "}
            <span className="text-stone-400">
              보유{" "}
              <em className="font-semibold not-italic">{(availableMileage - Number(mileage)).toLocaleString()}P</em>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
