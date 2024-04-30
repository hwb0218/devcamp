export interface OrderForm {
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  receiver: string;
  zipCode: string;
  mainAddress: string;
  subAddress: string;
  mainPhoneNumber: string;
}

export const getOrderForm = async (): Promise<OrderForm> => {
  const res = await fetch("http://localhost:3000/data/order.json", { method: "GET", cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
