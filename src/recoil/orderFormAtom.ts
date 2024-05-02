import { atom, selector } from "recoil";

import type { Coupon, ItemList, OrderFormRes } from "@/app/(payment)/checkout/_lib/getOrderForm";

export interface NewItemList extends ItemList {
  discountPrice: number;
}

export interface OrderFormAtom extends OrderFormRes {
  selectedCoupon?: Coupon;
  itemList: NewItemList[];
  mileage: string;
  totalPrice: number;
  totalDiscountPrice: number;
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
    availableMileage: 0,
    selectedCoupon: { label: "", value: 0, type: "" },
    totalPrice: 0,
    totalDiscountPrice: 0,
    mileage: "0"
  }
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const { itemList } = get(orderFormAtom);

    return itemList.reduce((acc, cur) => {
      return acc + cur.itemPrice * cur.orderCount;
    }, 0);
  },
  set: ({ get, set }) => {
    const orderForm = get(orderFormAtom);

    const totalPrice = orderForm.itemList.reduce((acc, cur) => {
      return acc + cur.itemPrice * cur.orderCount;
    }, 0);

    set(orderFormAtom, { ...orderForm, totalPrice });
  }
});

export const totalDiscountPriceSelector = selector({
  key: "totalDiscountPriceSelector",
  get: ({ get }) => {
    const { itemList } = get(orderFormAtom);

    return itemList.reduce((acc, cur) => {
      return acc + cur.itemPrice * cur.orderCount - cur.discountPrice;
    }, 0);
  },
  set: ({ get, set }, newValue) => {
    const orderForm = get(orderFormAtom);

    if (typeof newValue === "number") {
      return set(orderFormAtom, { ...orderForm, totalDiscountPrice: 0 });
    }

    const totalDiscountPrice = orderForm.itemList.reduce((acc, cur) => {
      return acc + cur.itemPrice * cur.orderCount - cur.discountPrice;
    }, 0);

    set(orderFormAtom, { ...orderForm, totalDiscountPrice });
  }
});

export const mileageSelector = selector({
  key: "mileageSelector",
  get: ({ get }) => {
    const orderForm = get(orderFormAtom);
    return orderForm.mileage;
  },
  set: ({ get, set }, inputValue) => {
    const orderForm = get(orderFormAtom);
    const { totalPrice } = orderForm;
    const maxPoints = totalPrice * 0.05;

    if (typeof inputValue !== "string") return;

    const filteredInput = inputValue.replace(/[^0-9]/g, "");

    let newValue = filteredInput === "" ? "0" : parseInt(filteredInput, 10).toString();

    if (parseInt(filteredInput) > maxPoints) {
      newValue = maxPoints.toString();
    }

    set(orderFormAtom, { ...orderForm, mileage: newValue });
  }
});
