export type ActionCardType = 'study' | 'work' | 'mental';

export interface CardData {
    id: string;
    name: string;
    description: string;
    image: string;
    actionType?: ActionCardType;
    mentalBoost?: number;
}
