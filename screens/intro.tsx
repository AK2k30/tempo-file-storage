import { Animated, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const MINIMUM = 2000;

const styles = StyleSheet.create({
    background: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
    }
});

export const Intro = () => {

    const [isWaiting, setIsWaiting] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsWaiting(false);
        }, MINIMUM);

        const random = Math.random();

        //fake
        if (random < 0.5) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    useEffect(() => {
        if(isWaiting){
            return;
        }

        if(loggedIn) {
            navigation.navigate('Main', {});
        }else {
            navigation.navigate('Login', {});
        }
    }, [loggedIn, isWaiting]);

    return (
        <SafeAreaView style={styles.background}>
            <Animated.View>
                <ImageBackground style={styles.image} source={require('../assets/images/home.png')}></ImageBackground>
            </Animated.View>
        </SafeAreaView>
    );
};
