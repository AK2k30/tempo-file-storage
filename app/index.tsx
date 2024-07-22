import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Intro } from '../screens/intro';
import {Login } from '../screens/login';
import { Main } from '../screens/Main';

const App = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Intro'>
                <Stack.Screen name='Intro' component={Intro}></Stack.Screen>
                <Stack.Screen name='Login' component={Login}></Stack.Screen>
                <Stack.Screen name='Main' component={Main}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    );
};  

const styles = StyleSheet.create({});

export default App;