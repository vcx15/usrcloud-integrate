export default function TabButton({
  isSelected,
  text,
  onClick,
}: {
  isSelected: boolean;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`p-0.5 h-6 ${isSelected ? "bg-[#2E8BFF] text-white": "bg-transparent text-black"} rounded hover:bg-[#2E8BFF] hover:text-white  peer-hover:bg-transparent peer-hover:text-black`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}
