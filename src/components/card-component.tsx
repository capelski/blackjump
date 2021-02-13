import React, { useEffect, useMemo } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { AppNavigation, Card, RouteNames, SimpleCardSymbol } from '../types';

interface CardComponentProps {
    card: Card;
    navigation?: AppNavigation;
}

const animationsDuration = 400;
const initialOpacity = 0;
const initialPosition = -20;

export const CardComponent: React.FC<CardComponentProps> = (props) => {
    const opacity = useMemo(() => new Animated.Value(initialOpacity), []);
    const position = useMemo(() => new Animated.Value(initialPosition), []);

    useEffect(() => {
        opacity.setValue(initialOpacity);
        position.setValue(initialPosition);

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
                backgroundColor: 'white',
                borderRadius: 8,
                height: 66,
                marginBottom: 8,
                marginRight: 8,
                opacity: opacity,
                transform: [{ translateY: position }],
                width: 56
            }}
        >
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
        </Animated.View>
    );
};
