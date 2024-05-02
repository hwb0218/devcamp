import { useState, useRef } from "react";
import { useAsync } from "react-use";

import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useRecoilValue } from "recoil";
import { orderFormAtom } from "@/recoil/orderFormAtom";

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;
const CUSTOMER_KEY = process.env.NEXT_PUBLIC_TOSS_CUSTOMER_KEY as string;

export default function useTossPayment() {
  const [paymentReady, setPaymentReady] = useState(false);
  const orderForm = useRecoilValue(orderFormAtom);
  const { totalPrice, totalDiscountPrice, mileage, itemList } = orderForm;
  const totalPaymentAmount = totalPrice - totalDiscountPrice - Number(mileage);

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);

  useAsync(async () => {
    try {
      const paymentWidget = await loadPaymentWidget(CLIENT_KEY, CUSTOMER_KEY);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: totalPaymentAmount },
        { variantKey: "DEFAULT" }
      );

      paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

      paymentMethodsWidget.on("ready", () => {
        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
        setPaymentReady(true);
      });
    } catch (error) {
      console.error("Error fetching payment widget:", error);
    }
  }, [totalPaymentAmount]);

  const handleClickPayment = async () => {
    try {
      const now = new Date();
      const date = now.toISOString().slice(0, 10).replace(/-/g, "");
      const time = now.getTime();
      const nonce = Math.random().toString().slice(-5);
      const orderId = `ORDER-${date}-${time}${nonce}`;
      const orderName =
        itemList.length === 0 ? itemList[0].itemName : `${itemList[0].itemName}외 ${itemList.length - 1}개 상품`;

      const paymentWidget = paymentWidgetRef.current;

      await paymentWidget?.requestPayment({
        orderId: orderId,
        orderName: orderName,
        customerName: orderForm.shippingAddress.receiver,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { paymentReady, handleClickPayment };
}
