import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Intro } from '../screens/intro';
import { Login } from '../screens/login';
import { Main } from '../screens/Main';
import OnboardingScreen from '../screens/OnboardingScreen'; // Ensure correct path
import { Home } from '@/screens/app';
import { TailwindProvider } from 'tailwindcss-react-native';

const App = () => {
    const Stack = createNativeStackNavigator();
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
    const [isIntroShown, setIsIntroShown] = useState(true);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const value = await AsyncStorage.getItem('onboardingCompleted');
            if (value === 'true') {
                setIsOnboardingCompleted(true);
            }
        };
        checkOnboardingStatus();

        // Simulate splash screen delay
        setTimeout(() => {
            setIsIntroShown(false);
        }, 2000);
    }, []);

    const handleOnboardingComplete = async () => {
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        setIsOnboardingCompleted(true);
    };

    if (isIntroShown) {
        return <Intro />;
    }

    return (
        <TailwindProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName={isOnboardingCompleted ? 'Main' : 'OnboardingScreen'}>
                    <Stack.Screen name='Intro' component={Intro} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={Login} options={{ headerLeft: () => null }} />
                    <Stack.Screen name='Main' component={Main} options={{ headerLeft: () => null }} />
                    <Stack.Screen name='OnboardingScreen'>
                        {props => <OnboardingScreen {...props} onComplete={handleOnboardingComplete} />}
                    </Stack.Screen>
                    <Stack.Screen name='Home' component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    );
};

const styles = StyleSheet.create({});

export default App;
