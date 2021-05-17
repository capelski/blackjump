import React from 'react';
import { View } from 'react-native';
import { colors } from '../constants';
import { getRandomCard } from '../logic/card';
import { createDealerHand, createHand } from '../logic/hand';
import { onBoardingSteps } from '../logic/onboarding';
import { getRandomTrainingPair } from '../logic/training-pair';
import {
    BaseDecisions,
    CardSuit,
    CasinoRulesKeys,
    Doubling,
    GameConfig,
    Hand,
    Phases,
    PlayerDecisions,
    SimpleCardSymbol,
    TrainingHands,
    TrainingProgress
} from '../types';
import { Button } from './button';

export interface ActionsProps {
    gameConfig: GameConfig;
    handlers: {
        double: () => void;
        hit: () => void;
        split: () => void;
        stand: () => void;
        surrender: () => void;
    };
    isDoubleEnabled: boolean;
    isSplitEnabled: boolean;
    isSurrenderEnabled: boolean;
    phase: Phases;
    onBoardingStep: number;
    startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
    trainingHands: TrainingHands;
    trainingProgress: TrainingProgress;
}

export const Actions: React.FC<ActionsProps> = (props) => {
    const isPlayerTurn = props.phase === Phases.player;

    const isDoublingAvailable =
        props.gameConfig.casinoRules[CasinoRulesKeys.doubling] > Doubling.none;
    const isSurrenderAvailable = props.gameConfig.casinoRules[CasinoRulesKeys.surrender];

    const activeOptionalButtons = 1 + Number(isDoublingAvailable) + Number(isSurrenderAvailable);
    const optionalButtonsWidth = Math.floor((100 * 100) / activeOptionalButtons) / 100;

    return props.phase === Phases.finished ? (
        <Button
            height={112}
            backgroundColor={colors[BaseDecisions.hit]}
            isEnabled={true}
            onPress={() => {
                let dealerHand: Hand;
                let playerHand: Hand;

                if (
                    onBoardingSteps[props.onBoardingStep] &&
                    onBoardingSteps[props.onBoardingStep].id === 1
                ) {
                    /* Prevent dealing a Blackjack as initial hand when onboarding is active */
                    playerHand = createHand([
                        {
                            isBlueCard: false,
                            isGoldCard: false,
                            suit: CardSuit.clubs,
                            symbol: SimpleCardSymbol.Seven
                        },
                        getRandomCard()
                    ]);
                    dealerHand = createDealerHand(
                        props.gameConfig.casinoRules,
                        SimpleCardSymbol.Six
                    );
                } else if (props.gameConfig.useGoldHands) {
                    const trainingPair = getRandomTrainingPair(
                        props.trainingHands,
                        props.trainingProgress,
                        props.gameConfig
                    );
                    playerHand = trainingPair.player;
                    dealerHand = trainingPair.dealer;
                } else {
                    playerHand = createHand([getRandomCard(), getRandomCard()]);
                    dealerHand = createDealerHand(props.gameConfig.casinoRules);
                }

                props.startTrainingRound(playerHand, dealerHand);
            }}
            text="Train"
            width="100%"
        />
    ) : (
        <React.Fragment>
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Button
                    height={56}
                    backgroundColor={colors[BaseDecisions.hit]}
                    isEnabled={isPlayerTurn}
                    onPress={props.handlers.hit}
                    text={BaseDecisions.hit}
                    width="50%"
                />
                <Button
                    height={56}
                    backgroundColor={colors[BaseDecisions.stand]}
                    isEnabled={isPlayerTurn}
                    onPress={props.handlers.stand}
                    text={BaseDecisions.stand}
                    width="50%"
                />
            </View>
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Button
                    height={56}
                    backgroundColor={colors[BaseDecisions.split]}
                    isEnabled={isPlayerTurn && props.isSplitEnabled}
                    onPress={props.handlers.split}
                    text={BaseDecisions.split}
                    width={`${optionalButtonsWidth}%`}
                />
                {isDoublingAvailable && (
                    <Button
                        height={56}
                        backgroundColor={colors[PlayerDecisions.double]}
                        isEnabled={isPlayerTurn && props.isDoubleEnabled}
                        onPress={props.handlers.double}
                        text={PlayerDecisions.double}
                        width={`${optionalButtonsWidth}%`}
                    />
                )}
                {isSurrenderAvailable && (
                    <Button
                        height={56}
                        backgroundColor={colors[PlayerDecisions.surrender]}
                        isEnabled={isPlayerTurn && props.isSurrenderEnabled}
                        onPress={props.handlers.surrender}
                        text={PlayerDecisions.surrender}
                        width={`${optionalButtonsWidth}%`}
                    />
                )}
            </View>
        </React.Fragment>
    );
};
