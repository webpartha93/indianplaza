import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  BackHandler,
  Alert 
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackScreen from './Screens/AuthStackScreen';
import TabScreen from './Screens/TabScreen';

import {useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ScanPage from './Screens/ScanPage';


const RootStack = createNativeStackNavigator();


const RootStackScreen = () => {  
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const verifyState = useSelector(state=> state.Verify);

  const readItemFromStorage = async () => {
    try {
      const loggedInUser = await AsyncStorage.getItem("uuid");
      console.log("localstoragedata", loggedInUser);
      if (loggedInUser !== null) {        
        setIsLoggedIn(loggedInUser);
      }else{
        setIsLoggedIn("");
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  useEffect(()=> {
    readItemFromStorage();
    setTimeout(()=> {
      setIsloading(false);
    }, 1500);
  },[readItemFromStorage]);

  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if(isloading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:"center", backgroundColor:"#FFF"}}>
        <Image
          source={require('./assets/logo.png')}
          width="100"
          height="100"
          resizeMode="cover"
        />
      </View>
    )
  };

  return (
    <RootStack.Navigator screenOptions={{
      headerShown: false
    }}>
      {
        isLoggedIn != "" ? (          
          <RootStack.Screen name="tab" component={TabScreen} /> 
        ):(
          <RootStack.Screen name="auth" component={AuthStackScreen} />
        )
      }
      <RootStack.Screen name="barcodecamera" component={ScanPage} options={{
          cardOverlayEnabled: true,
        }} />
    </RootStack.Navigator>
  )
}

const App = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};


export default App;
