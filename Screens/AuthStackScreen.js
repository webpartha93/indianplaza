import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Verification from './Verification';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name="login" component={Login}  />
            <AuthStack.Screen name="verification" component={Verification}  />
        </AuthStack.Navigator>
    )
}

export default AuthStackScreen;
