export interface OrderForm {
  shippingAddress: ShippingAddress;
  coupon: Coupon[];
  itemList: ItemList[];
  mileage: number;
}

export interface ShippingAddress {
  name: string;
  receiver: string;
  address: string;
  mainPhoneNumber: string;
}

export interface Coupon {
  label: string;
  value: number;
  type: string;
}

export interface ItemList {
  brandName: string;
  itemId: number;
  itemName: string;
  itemImage: string;
  itemPrice: number;
  orderCount: number;
  option: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getOrderForm = async (): Promise<OrderForm> => {
  const res = await fetch(`${BASE_URL}/data/order.json`, { method: "GET", cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
