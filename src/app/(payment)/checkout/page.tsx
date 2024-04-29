import LeftForm from "./_component/LeftForm";
import RightForm from "./_component/RightForm";

export default function Page() {
  return (
    <div className="flex justify-between">
      <LeftForm />
      <RightForm />
    </div>
  );
}
