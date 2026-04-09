// components / Case.tsx

interface CaseProps {
    text: string;
    hasPawn?: boolean;
    isCurrent?: boolean;
}

export function Case({ text, hasPawn = false, isCurrent = false }: CaseProps) {
    return (
        <div
            className={`relative flex items-center justify-center w-28 h-28 rounded-xl border-2 text-center px-2 font-bold text-base text-[#d8c99b] ${
                isCurrent ? 'border-[#d8973c] bg-[#a4243b]/50' : 'border-[#d8c99b]/70 bg-[#273e47]/70'
            }`}
        >
            <span>{text}</span>
            {hasPawn && (
                <span className="absolute -top-3 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#d8c99b] bg-[#d8973c] text-sm">
                    ●
                </span>
            )}
        </div>
    );
}