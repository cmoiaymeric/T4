export type BoardType = 'Natif' | 'Mobilite';

export interface ResourceState {
    argent: number;
    energie: number;
    santeMentale: number;
    pointsEtude: number;
}

export interface Character {
    id: string;
    nom: string;
    profil: string;
    plateauRecommande: BoardType;
    difficulte: 'Faible' | 'Moyenne' | 'Élevée';
    statsDepart: ResourceState;
}

export type ActionType = 'travail' | 'etude' | 'repos' | 'admin' | 'sante' | 'social';

export interface ActionCard {
    id: string;
    nom: string;
    icone: string;
    effetDescription: string;
    coutDescription: string;
    effet: Partial<ResourceState>;
    cout: Partial<ResourceState>;
    type: ActionType;
}

export interface EventCard {
    id: string;
    nom: string;
    icone: string;
    description: string;
    type: 'positif' | 'negatif';
    effetImmediate: Partial<ResourceState>;
}

export interface BoardSpace {
    id: number;
    nom: string;
    icone: string;
    description: string;
    actionsRequises: ActionType[];
    penaliteSiEchec: Partial<ResourceState>;
}

export interface Player {
    id: string;
    nom: string;
    character: Character | null;
    ressources: ResourceState;
    position: number;
    plateau: BoardType;
    main: ActionCard[];
    estEnBurnout: boolean;
    toursDePenalite: number;
}

export interface GameState {
    players: Player[];
    activePlayerId: string;
    tourActuel: number;
    evenementActif: EventCard | null;
    phase: 'choix_perso' | 'piocher_evenement' | 'resoudre_case' | 'fin_tour';
}
