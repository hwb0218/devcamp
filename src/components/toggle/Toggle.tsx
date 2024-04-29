interface ToggleProps {
  isToggled?: boolean;
  onToggle?: () => void;
}

const Toggle = ({ isToggled = false, onToggle = () => {} }: ToggleProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={isToggled} onChange={onToggle} className="sr-only peer" />
      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600 after:duration-200"></div>
    </label>
  );
};

export default Toggle;
