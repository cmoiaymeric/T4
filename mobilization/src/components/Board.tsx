import { Case } from './Case'

interface BoardProps {
  texts: string[];
  currentPosition: number;
}

const NATIVE_BOARD_LABELS = ['Rentrer', 'Partiel', 'Hasard', 'Loyer', 'Hasard', 'Partiel', 'Loyer', 'Diplome'];
const MOBILITY_BOARD_LABELS = ['Rentrer', 'Partiel', 'Hasard', 'Prefecture', 'Loyer', 'Hasard', 'Partiel', 'Loyer', 'Prefecture', 'Hasard', 'Partiel', 'Diplome'];

export type PlayerMode = 'natif' | 'mobilite';

export function getBoardLabels(mode: PlayerMode): string[] {
  return mode === 'natif' ? NATIVE_BOARD_LABELS : MOBILITY_BOARD_LABELS;
}

export function Board({ texts, currentPosition }: BoardProps) {
  return (
    <div className='flex flex-row flex-wrap gap-2 max-w-[760px]'>
      {texts.map((label, index) => (
        <Case key={`${label}-${index}`} text={label} hasPawn={index === currentPosition} isCurrent={index === currentPosition} />
      ))}
    </div>
  );
}
