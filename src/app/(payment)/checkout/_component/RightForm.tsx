import { useRecoilValue } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

import Header from "./Header";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function RightForm() {
  const orderForm = useRecoilValue(orderFormAtom);
  const { totalPrice, totalDiscountPrice } = orderForm;

  return (
    <aside className="ml-9 sticky top-12 min-w-[370px] max-h-[700px] flex-1">
      <section className="px-[30px] pb-10 border-[3px] border-black">
        <Header className="border-b border-b-stone-300">
          <h2 className="font-bold text-lg">결제 금액</h2>
        </Header>
        <ul className="my-[30px] [&>:not(:first-child)]:mt-4 text-sm *:flex *:justify-between">
          <li>
            <span>총 상품 금액</span>
            <span className="font-semibold">{totalPrice.toLocaleString()}원</span>
          </li>
          <li>
            <span>쿠폰 할인 금액</span>
            <span className="font-semibold text-orange-500">
              {`${totalDiscountPrice > 0 ? "-" : ""}${totalDiscountPrice.toLocaleString()}원`}
            </span>
          </li>
          <li>
            <span>마일리지 사용</span>
            <span className="font-semibold">-1,000P</span>
          </li>
          <li>
            <span>배송비</span>
            <span className="font-semibold">+0원</span>
          </li>
          <li className="items-center">
            <span className="font-bold">총 결제 금액</span>
            <span className="text-2xl font-bold text-orange-500">245,060원</span>
          </li>
        </ul>
        <div className="pt-[25px] border-t border-stone-300">
          <div className="flex items-center">
            <Checkbox id="0" className="mr-2" />
            <label htmlFor="0" className="font-medium">
              주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
            </label>
          </div>
          <ul className="*:flex *:items-center *:text-sm *:font-medium *:mt-2">
            <li>
              <Checkbox id="1" className="mr-2" />
              <label htmlFor="1" className="text-stone-500">
                (필수) 개인정보 수집/이용 동의
              </label>
            </li>
            <li>
              <Checkbox id="2" className="mr-2" />
              <label htmlFor="2" className="text-stone-500">
                (필수) 개인정보 제3자 제공 동의
              </label>
            </li>
            <li>
              <Checkbox id="3" className="mr-2" />
              <label htmlFor="3" className="text-stone-500">
                (필수) 결제대행 서비스 이용약관
              </label>
            </li>
          </ul>
        </div>
        <div className="mt-[30px]">
          <Button type="submit" size="lg" className="py-8 w-full text-xl font-bold">
            CHECK OUT
          </Button>
        </div>
      </section>
    </aside>
  );
}
