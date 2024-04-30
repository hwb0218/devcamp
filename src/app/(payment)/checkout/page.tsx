import LeftForm from "./_component/LeftForm";
import RightForm from "./_component/RightForm";
import { getOrderForm } from "./_lib/getOrderForm";

export default async function Page() {
  const orderForm = await getOrderForm();

  return (
    <div className="flex justify-between">
      <LeftForm orderForm={orderForm} />
      <RightForm />
    </div>
  );
}
