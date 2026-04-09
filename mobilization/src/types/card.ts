export type ActionCardType = 'study' | 'work' | 'mental';

export interface CardChoice {
    text: string;
    effect: {
        mentalHealth?: number;
        money?: number;
        cards?: number;
    };
}

export interface CardData {
    id: string;
    name: string;
    description: string;
    image: string;
    actionType?: ActionCardType;
    mentalBoost?: number;
    choices?: CardChoice[];
}
