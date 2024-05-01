import { atom, selector } from "recoil";

import type { Coupon, ItemList, OrderForm } from "@/app/(payment)/checkout/_lib/getOrderForm";

export interface NewItemList extends ItemList {
  discountPrice: number;
}

export interface OrderFormAtom extends OrderForm {
  selectedCoupon?: Coupon;
  itemList: NewItemList[];
}

export const orderFormAtom = atom<OrderFormAtom>({
  key: "orderFormAtom",
  default: {
    shippingAddress: {
      name: "",
      receiver: "",
      address: "",
      mainPhoneNumber: ""
    },
    coupon: [],
    itemList: [],
    mileage: 0,
    selectedCoupon: { label: "", value: 0, type: "" }
  }
});

export const totalDiscountPriceSelector = selector({
  key: "totalDiscountPriceSelector",
  get: ({ get }) => {
    const { itemList } = get(orderFormAtom);

    return itemList.reduce((acc, cur) => {
      return acc + cur.itemPrice * cur.orderCount - cur.discountPrice;
    }, 0);
  }
});
