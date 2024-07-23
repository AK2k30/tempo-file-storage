import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MINIMUM_TIME_IN_MS_FOR_INTRO = 2000;

const styles = StyleSheet.create({
    background: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white' // You can set a fixed background color here
    },
    image: {
        width: 150,
        height: 150
    }
});

export const Intro = () => {
    // skipcq: JS-0356
    const [isWaiting, setIsWaiting] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsWaiting(false);
            navigation.navigate('OnboardingScreen', {});
        }, MINIMUM_TIME_IN_MS_FOR_INTRO);

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground style={styles.image} source={require('../assets/images/an1.gif')}></ImageBackground>
        </SafeAreaView>
    );
};