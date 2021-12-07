import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

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
import OrderHistoryDetails from './OrderHistoryDetails';

import { useDispatch, useSelector } from 'react-redux';

import { doLogout } from '../Redux/Actions/VerifyActions';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const History = createNativeStackNavigator();

const HomeStackScreens = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Branch" component={Branch} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="activity" component={Activity} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="Supplier" component={Supplier} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="deliveryinfo" component={DeliveryInfo} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="Scanbarcode" component={ScanBarcode} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="ProductList" component={ProductList} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="ProductInfo" component={ProductInfo} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="UnitMeasure" component={UnitMeasure} screenOptions={{ headerShown: false }} />
  </HomeStack.Navigator>
)

const HistoryStackScreens = ({ navigation }) => (
  <History.Navigator screenOptions={{ headerShown: false }}>
    <History.Screen name="History" component={OrderHistory} screenOptions={{ headerShown: false }} />
    <HomeStack.Screen name="SingleHistory" component={OrderHistoryDetails} screenOptions={{ headerShown: false }} />
  </History.Navigator>
)


const TabScreen = ({ navigation, route }) => {
  const cartState = useSelector(state => state.CartReducer);
  const checkoutState = useSelector(state => state.CheckOutReducers);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (checkoutState.checkoutSuccessMessage.status === "Success") {
      cartState.cartItems.length = 0;
      dispatch({ type: "RESET_CART_DATA" })
    }
  }, [checkoutState]);




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

  const removeLocalStore = async () => {
    try {
      await AsyncStorage.removeItem('uuid')
    } catch (e) {
      // remove error
    }
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "#515151",
        tabBarLabelStyle: {
          fontSize: 14
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5
        },
        headerShown: false
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeStackScreens}
        options={({ route }) => ({
          tabBarActiveTintColor: route.name == "Home" ? "#1788F0" : "#515151",
          tabBarInactiveTintColor: "#515151",
          tabBarLabel: 'Cart',
          tabBarColor: "#FFFFFF",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            //e.preventDefault();
            dispatch({ type: "RESET_SCAN_DATA" })
            //navigation.navigate('Cart');
          },
        })}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={({ route }) => ({
          tabBarInactiveTintColor: "#515151",
          tabBarLabel: 'Cart',
          tabBarColor: "#FFFFFF",
          tabBarIcon: ({ color, size }) => (
            <Icon name="shoppingcart" color={color} size={size} />
          ),
          tabBarBadge: cartState.cartItems.length
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            dispatch({ type: "RESET_SCAN_DATA" })
          },
        })}
      />
      <Tab.Screen
        name="empty"
        component={Branch}
        options={({ route }) => ({
          tabBarInactiveTintColor: "#515151",
          tabBarLabel: 'Empty',
          tabBarColor: "#FFFFFF",
          tabBarIcon: ({ color, size }) => (
            <Icon name="delete" color={color} size={size} />
          ),
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            // navigation.navigate('Cart');
            cartState.cartItems.length > 0 && (
              Alert.alert(
                "Do you really want to delete?",
                "",
                [{ text: "No", onPress: () => console.log('hi') },
                { text: "Yes", onPress: () => dispatch({ type: "RESET_CART_DATA" }) }
                ]
              )
            )
            
          },
        })}
      />
      <Tab.Screen
        name="AllHistory"
        component={HistoryStackScreens}
        options={({ route }) => ({
          tabBarActiveTintColor: "#1788F0",
          tabBarInactiveTintColor: "#515151",
          tabBarLabel: 'History',
          tabBarColor: "#FFFFFF",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="documents" color={color} size={size} />
          ),
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            dispatch({ type: "RESET_SCAN_DATA" })
          }
        })}        
        />
      <Tab.Screen
        name="signout"
        component={Branch}
        options={({ route }) => ({
          tabBarLabel: 'Sign Out',
          tabBarColor: "#FFFFFF",
          tabBarIcon: ({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            removeLocalStore();
            dispatch(doLogout());
          },
        })}
      />
    </Tab.Navigator>
  )
}

export default TabScreen;
