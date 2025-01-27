export default function RatioCard({
  name,
  value,
  ratio,
  color,
}: {
  name: string;
  value: string;
  ratio: string;
  color: string;
}) {
  return (
    <div className="flex flex-col text-left">
      <div className="flex flex-row items-center">
        <div className={`w-3 h-3 ${color} rounded-sm`}></div>
        <div className="w-24 ml-4">{name}</div>
        <div className="w-20">占比</div>
      </div>
      <div className="flex flex-row">
        <div className="w-3"></div>
        <div className="w-24 ml-4">{value}kw·h</div>
        <div className="w-20">{ratio}%</div>
      </div>
    </div>
  );
}
