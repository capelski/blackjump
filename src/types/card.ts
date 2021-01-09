export interface Card {
    isBlueCard: boolean;
    isGoldCard: boolean;
    suit: CardSuit;
    symbol: CardSymbol;
}

export enum CardSuit {
    clubs = '\u2663',
    diamonds = '\u2666',
    hearts = '\u2665',
    spades = '\u2660'
}

export type CardSymbol = SimpleCardSymbol | SpecialCardSymbol;

export enum SimpleCardSymbol {
    Ace = 'A',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
    Seven = '7',
    Eight = '8',
    Nine = '9',
    Ten = '10'
}

export enum SpecialCardSymbol {
    Jack = 'J',
    Queen = 'Q',
    King = 'K'
}

export type TenPointsCardSymbol = SimpleCardSymbol.Ten | SpecialCardSymbol;
