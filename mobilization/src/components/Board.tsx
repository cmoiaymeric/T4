import { Case } from './Case'

interface BoardProps {
  nb_cases: number
  texts: string[]
}

const easyTexts = ["1", "2", "3"];
const hardTexts = ["4", "5", "6"];

export type Difficulty = 'easy' | 'hard'

export const boardMap: Record<Difficulty, () => JSX.Element> = {
  easy: () => <Board_Easy />,
  hard: () => <Board_Hard />,
}

export function Board({ nb_cases, texts }: BoardProps) {
  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {Array.from({ length: nb_cases }).map((_, index) => (
        <Case key={index} text={texts[index]} />
      ))}
    </div>
  );
}

export function Board_Easy() {
  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {Array.from({ length: 12 }).map((_, index) => (
        <Case key={index} text={easyTexts[index % easyTexts.length]} />
      ))}
    </div>
  );
}

export function Board_Hard() {
  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {Array.from({ length: 12 }).map((_, index) => (
        <Case key={index} text={hardTexts[index % hardTexts.length]} />
      ))}
    </div>
  );
}