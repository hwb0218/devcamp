import type { NewItemList } from "@/recoil/orderFormAtom";
import type { Coupon } from "@/app/(payment)/checkout/_lib/getOrderForm";

const getDiscountPrice = (itemPrice: number, coupon: Coupon) => {
  if (coupon.type === "fixed") {
    return itemPrice < coupon.value ? coupon.value - (coupon.value - itemPrice) : coupon.value;
  }
  if (coupon.type === "percent") {
    return itemPrice * (coupon.value / 100);
  }
  return 0;
};

export default function calcDiscountPrice(itemList: NewItemList[], coupon: Coupon) {
  const newItemList = itemList.map(item => {
    const discountPrice = getDiscountPrice(item.itemPrice, coupon);
    return { ...item, discountPrice };
  });

  return newItemList;
}
