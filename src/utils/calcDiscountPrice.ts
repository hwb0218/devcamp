import type { NewItemList } from "@/recoil/orderFormAtom";
import type { Coupon } from "@/app/(payment)/checkout/_lib/getOrderForm";

const getDiscountPrice = (price: number, coupon: Coupon) => {
  if (coupon.type === "fixed") {
    return coupon.value;
  } else if (coupon.type === "percent") {
    return price * (coupon.value / 100);
  }
  return 0;
};

export default function calcDiscountPrice(itemList: NewItemList[], coupon: Coupon) {
  const newItemList = itemList.map(item => {
    const discount = getDiscountPrice(item.itemPrice, coupon);
    return { ...item, discountPrice: item.itemPrice * item.orderCount - discount };
  });

  return newItemList;
}
