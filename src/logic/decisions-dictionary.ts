import { Dictionary, RelevantHand, GameSettingsKeys } from '../types';
import { createDecisionsSet } from './decisions-set';

const double_hit = createDecisionsSet('double/hit');
const hit = createDecisionsSet('hit');
const split = createDecisionsSet('split');
const splitIfDas_hit = createDecisionsSet('splitIfDasAllowed/hit');
const stand = createDecisionsSet('stand');

export const decisionsDictionary: Dictionary<RelevantHand> = {
    // Hard hands
    // '4' -> Only possible with 2,2. Covered in Split hands
    '5': { decisions: hit, dependencies: [], level: () => 1, name: 'Hard 5' },
    '6': { decisions: hit, dependencies: [], level: () => 1, name: 'Hard 6' },
    '7': { decisions: hit, dependencies: [], level: () => 1, name: 'Hard 7' },
    '8': { decisions: hit, dependencies: [], level: () => 1, name: 'Hard 8' },
    '9': {
        decisions: hit.until.dealer(2).then.double_hit.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 3,
        name: 'Hard 9'
    },
    '10': {
        decisions: double_hit.until.dealer(9).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 10'
    },
    '11': {
        decisions: double_hit.until.dealer(10).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 11'
    },
    '12': {
        decisions: hit.until.dealer(3).then.stand.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 3,
        name: 'Hard 12'
    },
    '13': {
        decisions: stand.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 13'
    },
    '14': {
        decisions: stand.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 14'
    },
    '15': {
        decisions: stand.until
            .dealer(6)
            .then.hit.until.dealer(9)
            .then.surrenderIfAllowed_hit.until.dealer(10).then.hit,
        dependencies: [GameSettingsKeys.canSurrender],
        level: (gameSettings) => (gameSettings.canSurrender ? 4 : 2),
        name: 'Hard 15'
    },
    '16': {
        decisions: stand.until.dealer(6).then.hit.until.dealer(8).then.surrenderIfAllowed_hit,
        dependencies: [GameSettingsKeys.canSurrender],
        level: (gameSettings) => (gameSettings.canSurrender ? 3 : 2),
        name: 'Hard 16'
    },
    '17': { decisions: stand, dependencies: [], level: () => 1, name: 'Hard 17' },
    '18': { decisions: stand, dependencies: [], level: () => 1, name: 'Hard 18' },
    '19': { decisions: stand, dependencies: [], level: () => 1, name: 'Hard 19' },
    '20': { decisions: stand, dependencies: [], level: () => 1, name: 'Hard 20' },
    // '21' -> Maximum score! This hand doesn't need training

    // Soft hands
    '3/13': {
        decisions: hit.until.dealer(4).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleOnAnyInitialHand],
        level: (gameSettings) => (gameSettings.canDoubleOnAnyInitialHand ? 3 : 1),
        name: 'Soft 13'
    },
    '4/14': {
        decisions: hit.until.dealer(4).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleOnAnyInitialHand],
        level: (gameSettings) => (gameSettings.canDoubleOnAnyInitialHand ? 3 : 1),
        name: 'Soft 14'
    },
    '5/15': {
        decisions: hit.until.dealer(3).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleOnAnyInitialHand],
        level: (gameSettings) => (gameSettings.canDoubleOnAnyInitialHand ? 3 : 1),
        name: 'Soft 15'
    },
    '6/16': {
        decisions: hit.until.dealer(3).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleOnAnyInitialHand],
        level: (gameSettings) => (gameSettings.canDoubleOnAnyInitialHand ? 3 : 1),
        name: 'Soft 16'
    },
    '7/17': {
        decisions: hit.until.dealer(2).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleOnAnyInitialHand],
        level: (gameSettings) => (gameSettings.canDoubleOnAnyInitialHand ? 3 : 1),
        name: 'Soft 17'
    },
    '8/18': {
        decisions: stand.until
            .dealer(2)
            .then.doubleIfAllowed_stand.until.dealer(6)
            .then.stand.until.dealer(8).then.hit,
        dependencies: [GameSettingsKeys.canDoubleOnAnyInitialHand],
        level: (gameSettings) => (gameSettings.canDoubleOnAnyInitialHand ? 3 : 1),
        name: 'Soft 18'
    },
    '9/19': { decisions: stand, dependencies: [], level: () => 1, name: 'Soft 19' },
    '10/20': { decisions: stand, dependencies: [], level: () => 1, name: 'Soft 20' },
    // 'A,Figure' -> BlackJack! This hand doesn't need training

    // Split hands
    '2,2': {
        decisions: splitIfDas_hit.until.dealer(3).then.split.until.dealer(7).then.hit,
        dependencies: [GameSettingsKeys.canDoubleAfterSplit],
        level: (gameSettings) => (gameSettings.canDoubleAfterSplit ? 2 : 3),
        name: '2,2'
    },
    '3,3': {
        decisions: splitIfDas_hit.until.dealer(3).then.split.until.dealer(7).then.hit,
        dependencies: [GameSettingsKeys.canDoubleAfterSplit],
        level: (gameSettings) => (gameSettings.canDoubleAfterSplit ? 2 : 3),
        name: '3,3'
    },
    '4,4': {
        decisions: hit.until.dealer(4).then.splitIfDasAllowed_hit.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleAfterSplit],
        level: (gameSettings) => (gameSettings.canDoubleAfterSplit ? 3 : 1),
        name: '4,4'
    },
    '5,5': {
        decisions: double_hit.until.dealer(9).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 10'
    },
    '6,6': {
        decisions: splitIfDas_hit.until.dealer(2).then.split.until.dealer(6).then.hit,
        dependencies: [GameSettingsKeys.canDoubleAfterSplit],
        level: (gameSettings) => (gameSettings.canDoubleAfterSplit ? 2 : 3),
        name: '6,6'
    },
    '7,7': {
        decisions: split.until.dealer(7).then.hit,
        dependencies: [],
        level: () => 2,
        name: '7,7'
    },
    '8,8': { decisions: split, dependencies: [], level: () => 1, name: '8,8' },
    '9,9': {
        decisions: split.until.dealer(6).then.stand.until.dealer(7).then.split.until.dealer(9).then
            .stand,
        dependencies: [],
        level: () => 4,
        name: '9,9'
    },
    'Figure,Figure': { decisions: stand, dependencies: [], level: () => 1, name: 'Hard 20' },
    'A,A': { decisions: split, dependencies: [], level: () => 1, name: 'A,A' }
};
