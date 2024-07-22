import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { Animated, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MINIMUM_TIME_IN_MS_FOR_INTRO = 2000;
const ANIMATION_DURATION_MS = 1000;

const styles = StyleSheet.create({
    background: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150
    }
});

export const Intro = () => {
    const [isWaiting, setIsWaiting] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigation = useNavigation();

    const [colors, setColors] = useState(['red', 'blue', 'yellow', 'orange', 'green']);

    const animatedSpin = new Animated.Value(0);

    const spin = animatedSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const animateClokwise = Animated.timing(animatedSpin, {
        toValue: 1,
        duration: ANIMATION_DURATION_MS,
        useNativeDriver: true,
    });

    const animateCounterclockwise = Animated.timing(animatedSpin, {
        toValue: 0,
        duration: ANIMATION_DURATION_MS,
        useNativeDriver: true,
    });

    const sequence = Animated.sequence([animateClokwise, animateCounterclockwise]);

    Animated.loop(sequence).start();

    const randomBackgroundColor = useMemo(() => {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }, []);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsWaiting(false);
        }, MINIMUM_TIME_IN_MS_FOR_INTRO);

        const random = Math.random();

        // fake call (call backend instead)
        if (random < 0.5) { // 50% of the time we fake a log in successful
            setLoggedIn(true);
        } else {
            setLoggedIn(false); // 50% of the time we fake a log in unsuccessful
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    useEffect(() => {
        if (isWaiting) {
            return;
        }

        if (loggedIn) {
            navigation.navigate('Main', {});
        } else {
            navigation.navigate('Login', {});
        }

    }, [loggedIn, isWaiting]);

    return (
        <SafeAreaView style={[styles.background, { backgroundColor: randomBackgroundColor }]}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <ImageBackground style={styles.image} source={require('../assets/images/an1.gif')}></ImageBackground>
            </Animated.View>
        </SafeAreaView>
    );
};