import { Case } from './Case'

interface BoardProps {
  nb_cases: number
  texts: string[]
}

const CASE_LABELS = ['Partiel', 'Loyer', 'Préfecture', 'Hasard'];

function buildCaseLabels(totalCases: number, offset: number): string[] {
  return Array.from({ length: totalCases }).map((_, index) => CASE_LABELS[(index + offset) % CASE_LABELS.length]);
}

const easyTexts = buildCaseLabels(12, 0);
const hardTexts = buildCaseLabels(12, 2);

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
      {Array.from({ length: easyTexts.length }).map((_, index) => (
        <Case key={index} text={easyTexts[index]} />
      ))}
    </div>
  );
}

export function Board_Hard() {
  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {Array.from({ length: hardTexts.length }).map((_, index) => (
        <Case key={index} text={hardTexts[index]} />
      ))}
    </div>
  );
}
