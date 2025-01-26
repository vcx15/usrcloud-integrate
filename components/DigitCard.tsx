export default function DigitCard({ digit }: { digit: number }) {
    return <div className="bg-[url('/number-bg.svg')] bg-cover text-center"><div className="text-[31px] w-[34px]">{digit}</div></div>
}