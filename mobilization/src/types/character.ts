export type OriginType = 'france' | 'international';

export interface CharacterProfile {
    id: string;
    firstName: string;
    lastName: string;
    nationality: string;
    flag: string;
    image: string;
    origin: OriginType;
    mentalHealth: number;
    maxMentalHealth: number;
    trait?: string;
    incomeLevel?: 'low' | 'medium' | 'high';
    startingMoney?: number;
}
