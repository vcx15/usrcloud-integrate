export default function GeneralButton({
    customStyle,
    text,
}: {
    customStyle?: string;
    text: string;
}) {
    return (
        <button className={`flex flex-row items-center ${customStyle}`}>
            <span>{text}</span>
        </button>
    )
}