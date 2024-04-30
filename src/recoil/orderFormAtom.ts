import { OrderForm } from "@/app/(payment)/checkout/_lib/getOrderForm";
import { atom } from "recoil";

export const orderFormAtom = atom<OrderForm>({
  key: "orderFormAtom",
  default: {
    shippingAddress: {
      name: "",
      receiver: "",
      address: "",
      mainPhoneNumber: ""
    },
    coupon: [],
    itemList: []
  }
});
