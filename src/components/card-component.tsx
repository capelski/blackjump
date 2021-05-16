import { Audio } from 'expo-av';
import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import cardSlideSoundMp3 from '../../assets/card-slide.mp3';
import { createSoundQueue, pushSound } from '../logic/sound-queue';
import { AppNavigation, Card, RouteNames, SimpleCardSymbol } from '../types';

interface CardComponentProps {
    card: Card;
    isSoundEnabled: boolean;
    navigation?: AppNavigation;
    skipAnimation?: boolean;
}

const animationsDuration = 400;
const initialOpacity = 0;
const initialPosition = -20;

const soundQueue = createSoundQueue();

export const CardComponent: React.FC<CardComponentProps> = (props) => {
    const opacity = useMemo(() => new Animated.Value(initialOpacity), []);
    const position = useMemo(() => new Animated.Value(initialPosition), []);
    const [cardSlideSound, setCardSlideSound] = useState<Audio.Sound | false>();

    const animateCard = (sound?: Audio.Sound | false) => {
        if (!props.skipAnimation) {
            Animated.parallel([
                Animated.timing(opacity, {
                    useNativeDriver: true,
                    toValue: 1,
                    duration: animationsDuration * 2
                }),
                Animated.timing(position, {
                    useNativeDriver: true,
                    toValue: 0,
                    duration: animationsDuration
                })
            ]).start();
        }

        if (props.isSoundEnabled && sound) {
            pushSound(soundQueue, sound);
        }
    };

    useEffect(() => {
        if (cardSlideSound === undefined) {
            Audio.Sound.createAsync(cardSlideSoundMp3, { volume: 0.5 })
                .then((result) => {
                    animateCard(result.sound);
                    setCardSlideSound(result.sound);
                })
                .catch(() => {
                    /* Failing to load audio is not a critical issue */
                    animateCard();
                    setCardSlideSound(false);
                });
        } else {
            if (!props.skipAnimation) {
                opacity.setValue(initialOpacity);
                position.setValue(initialPosition);
            }

            animateCard(cardSlideSound);
        }
    }, [props.card]);

    const cardColor = props.card.isBlueCard
        ? '#346fa1'
        : props.card.isGoldCard
        ? '#e5c100'
        : props.card.suit === '♦' || props.card.suit === '♥'
        ? 'red'
        : 'black';

    return (
        <Animated.View
            style={{
                backgroundColor: props.card.isHoleCard ? 'lightgrey' : 'white',
                borderRadius: 8,
                height: 66,
                marginBottom: 8,
                marginRight: 8,
                opacity: props.skipAnimation ? undefined : opacity,
                transform: props.skipAnimation ? undefined : [{ translateY: position }],
                width: 56
            }}
        >
            {!props.card.isHoleCard && (
                <TouchableOpacity
                    onPress={
                        props.navigation
                            ? () => {
                                  if (props.card.isBlueCard) {
                                      props.navigation!.navigate(RouteNames.blueCardsInfo);
                                  } else if (props.card.isGoldCard) {
                                      props.navigation!.navigate(RouteNames.goldHandsInfo);
                                  }
                              }
                            : undefined
                    }
                >
                    {props.card.isBlueCard || props.card.isGoldCard ? (
                        <View
                            style={{
                                backgroundColor: cardColor,
                                borderRadius: props.card.isBlueCard ? 12 : undefined,
                                height: 12,
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                width: 12
                            }}
                        />
                    ) : (
                        <Text
                            style={{
                                color: cardColor,
                                fontSize: 16,
                                position: 'absolute',
                                right: 4,
                                top: 4
                            }}
                        >
                            {props.card.suit}
                        </Text>
                    )}
                    <Text
                        style={{
                            color: cardColor,
                            fontSize: 40,
                            marginRight: props.card.symbol === SimpleCardSymbol.Ten ? 0 : 8,
                            marginTop: 12,
                            textAlign: 'center'
                        }}
                    >
                        {props.card.symbol}
                    </Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};
