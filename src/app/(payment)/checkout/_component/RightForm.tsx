import { useRecoilValue } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

import Header from "./shared/Header";

import { Button } from "@/components/ui/button";

import useTossPayment from "../_hook/useTossPayment";
import Payment from "./Payment";

export default function RightForm() {
  const { paymentReady, handleClickPayment } = useTossPayment();

  const orderForm = useRecoilValue(orderFormAtom);
  const { totalPrice, totalDiscountPrice, mileage } = orderForm;

  const totalPaymentAmount = totalPrice - totalDiscountPrice - Number(mileage);

  return (
    <aside className="ml-9 sticky top-12 min-w-[370px] max-h-[700px] flex-1">
      <section className="pb-10 border-[3px] border-black">
        <Header className="mx-[30px] border-b border-b-stone-300">
          <h2 className="font-bold text-lg">결제 금액</h2>
        </Header>
        <ul className="pb-[30px] mx-[30px] mt-[30px] [&>:not(:first-child)]:mt-4 text-sm *:flex *:justify-between">
          <li>
            <span>총 상품 금액</span>
            <span className="font-semibold">{totalPrice.toLocaleString()}원</span>
          </li>
          <li>
            <span>쿠폰 할인 금액</span>
            <span className="font-semibold text-orange-500">
              {`${totalDiscountPrice > 0 ? "-" : "+"}${totalDiscountPrice.toLocaleString()}원`}
            </span>
          </li>
          <li>
            <span>마일리지 사용</span>
            <span className="font-semibold">
              {`${Number(mileage) > 0 ? "-" : "+"}${Number(mileage).toLocaleString()}`}P
            </span>
          </li>
          <li>
            <span>배송비</span>
            <span className="font-semibold">+0원</span>
          </li>
          <li className="items-center">
            <span className="font-bold">총 결제 금액</span>
            <span className="text-2xl font-bold text-orange-500">{`${totalPaymentAmount.toLocaleString()}원`}</span>
          </li>
        </ul>
        <Payment />
        <div className="mx-[30px]">
          <Button
            type="submit"
            size="lg"
            disabled={!paymentReady}
            onClick={handleClickPayment}
            className="py-8 w-full text-xl font-bold"
          >
            CHECK OUT
          </Button>
        </div>
      </section>
    </aside>
  );
}
