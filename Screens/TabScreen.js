import React, {useEffect} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    BackHandler,
    Alert 
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Branch from './Branch';
import Activity from './Activity';
import Supplier from './Supplier';
import DeliveryInfo from './DeliveryInfo';
import ScanBarcode from './ScanBarcode';
import ProductList from './ProductList';
import ProductInfo from './ProductInfo';
import UnitMeasure from './UnitMeasure';
import Cart from './Cart';
import OrderHistory from './OrderHistory';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreens = ({navigation})=> (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
        <HomeStack.Screen name="Branch" component={Branch} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="activity" component={Activity} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="Supplier" component={Supplier} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="deliveryinfo" component={DeliveryInfo} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="Scanbarcode" component={ScanBarcode} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="ProductList" component={ProductList} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="ProductInfo" component={ProductInfo} screenOptions={{headerShown:false}} />
        <HomeStack.Screen name="UnitMeasure" component={UnitMeasure} screenOptions={{headerShown:false}} />
    </HomeStack.Navigator> 
)


const TabScreen = () => {

    useEffect(() => {
        const backAction = () => {
        //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //     {
        //       text: "Cancel",
        //       onPress: () => null,
        //       style: "cancel"
        //     },
        //     { text: "YES", onPress: () => BackHandler.exitApp() }
        //   ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor:"#1788F0",
            tabBarLabelStyle: { 
                fontSize:14
            },
            tabBarStyle:{
                height:60,
                paddingBottom:5
            },
            headerShown:false
      }}>
        <Tab.Screen 
        name="Minuscircleo" 
        component={HomeStackScreens} 
        options= {({ route }) => ({
            tabBarLabel: 'Minuscircleo',
            tabBarColor:"#FFFFFF",
            tabBarIcon: ({ color,size }) => (
                <Icon name="minuscircleo" color={color} size={size} />
            )        
        })} 
        listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Branch');
            },
          })}
        />
        <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options= {({ route }) => ({
            tabBarLabel: 'Cart',
            tabBarColor:"#FFFFFF",
            tabBarIcon: ({ color,size }) => (
                <Icon name="shoppingcart" color={color} size={size} />
            )        
        })} />
        <Tab.Screen 
        name="History" 
        component={OrderHistory} 
        options= {({ route }) => ({
            tabBarLabel: 'History',
            tabBarColor:"#FFFFFF",
            tabBarIcon: ({ color,size }) => (
                <Entypo name="documents" color={color} size={size} />
            )        
        })} />
        <Tab.Screen 
        name="User" 
        component={Branch} 
        options= {({ route }) => ({
            tabBarLabel: 'User',
            tabBarColor:"#FFFFFF",
            tabBarIcon: ({ color,size }) => (
                <Icon name="user" color={color} size={size} />
            )        
        })} />
    </Tab.Navigator>
    )
}

export default TabScreen;
