import OrderForm from "./_component/OrderForm";

import { getOrderForm } from "./_lib/getOrderForm";

export default async function Page() {
  const orderForm = await getOrderForm();

  return (
    <div className="flex justify-between">
      <OrderForm orderForm={orderForm} />
    </div>
  );
}
