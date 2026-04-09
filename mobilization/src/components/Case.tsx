// components / Case.tsx

interface CaseProps {
    text: string
}

export function Case({ text }: CaseProps) {
    return (
        <div className='flex items-center justify-center w-32 h-32 border-2 border-black font-bold text-lg'>
            {text}
        </div>
    )
}