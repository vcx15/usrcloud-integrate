export default function GeneralButton({
    customStyle,
    text,
    onClick,
}: {
    customStyle?: string;
    text: string;
    onClick: () => void;
}) {
    return (
        <button className={`flex flex-row items-center ${customStyle}`} onClick={onClick}>
            <span>{text}</span>
        </button>
    )
}