import { Case } from './Case'

interface BoardProps {
    nb_cases: number
    texts: string[]
}

export function Board({ nb_cases, texts }: BoardProps) {
    return (
        <div className='flex flex-wrap gap-2'>
            {Array.from({ length: nb_cases }).map((_, index) => (
                <Case key={index} text={texts[index]} />
            ))}
        </div>
    )
}