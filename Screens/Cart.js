import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { doCheckout } from '../Redux/Actions/CheckoutAction';
import { itemIncrement, itemDecrement } from '../Redux/Actions/cartAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



const Cart = ({ navigation, route }) => {
    const state = useSelector(state => state.CartReducer);
    const checkoutState = useSelector(state => state.CheckOutReducers);
    const dispatch = useDispatch();
    const [empId, setEmpId] = useState('');
    const [toggle, setToggle] = useState(false);
    const [getAllData, setGetAllData] = useState('');
    const [getCartItems, setGetCartItems] = useState([]);

    // useEffect(()=>{
    //     if( route.params!==undefined){
    //         setGetAllData(route.params.getAllData);
    //     }
    // }, []);

    const readItemFromStorage = async () => {
        try {
          const loggedInUser = await AsyncStorage.getItem("uuid");
          const parseVal = JSON.parse(loggedInUser);
          if (loggedInUser !== null) {        
            return parseVal.emp_id;
          }
        } catch (e) {
          alert('Failed to fetch the data from storage')
        }
      }

    useEffect(()=> {
        readItemFromStorage().then((value) => setEmpId(value));
    },[]);


    useEffect(()=>{
        setGetAllData(state.getAllData);        
    }, [state]);

    
    const doCheckOut = ()=> {
        const updatedCartItem = state.cartItems.map(({productName,...rest}) => ({...rest}));
        console.log('result', getAllData);
        dispatch(doCheckout({
            getAllData,
            updatedCartItem,
            empId
        }));
    }
    useEffect(()=>{
        if(checkoutState.checkoutSuccessMessage.status==="Success"){
            //navigation.navigate('navigation');
            console.log('cart-remove');
            checkoutState.checkoutSuccessMessage.status="";
            dispatch({type:"RESET_CART_DATA"});
            Toast.show({
                type: 'success',
                text1:"Your order has been received",
            });
            
        }
    }, [checkoutState]);


    const handleIncrement = (id)=> {
        dispatch(itemIncrement(id));
    }
    const handleDecrement = (id)=> {
        dispatch(itemDecrement(id));
    }

    const checkItemZero = (id)=> Alert.alert(
        "Do you really want to delete?",
        "",
        [
            {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Yes", onPress: () => handleDecrement(id) }
        ]
    )

    const showAlert = () =>
        Alert.alert(
            "Do you really want to submit?",
            "",
            [
                {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Yes", onPress: () => doCheckOut() }
            ]
        );

    return (
        <>
        <ScrollView style={styles.mainWrapper}>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.Heading}>Cart</Text>
                {
                    state.cartItems.length > 0 && (
                    <TouchableOpacity style={{ position: "absolute", right: 0 }}>
                        <MaterialIcons size={32} color="#1788F0" name="delete-outline" />
                    </TouchableOpacity>
                    )
                }
                
            </View>             
            {
                state.cartItems.length > 0 ? (
                    state.cartItems.map((item,index) => {
                        return (
                            <View style={styles.singleCartProduct} key={index}>
                                <TouchableOpacity onPress={() =>  setToggle(!toggle)} style={{ marginRight: 15, width: 17 }}>
                                    {                                        
                                        toggle ? (
                                            <View style={{ width: 16, position: "relative", height: 16 }}>
                                                <MaterialIcons size={16} color="#3623B7" name="check-box" style={{ position: "absolute", top: 0, left: 0 }} />
                                            </View>
                                        ) : (
                                            <View style={{ width: 15, height: 15, borderRadius: 3, borderColor: "#CECECE", borderWidth: 1, backgroundColor: "#FFF" }}></View>    
                                        )
                                    }
                                </TouchableOpacity>
                                <Image source={require('../assets/product.png')} />
                                <View style={{ paddingHorizontal: 10, width:"45%" }}>
                                    <Text style={{ color: "#626F7F", fontSize: 12, fontWeight: "700" }}>{item.productName}{item.index}</Text>
                                    <Text style={{ color: "#626F7F", fontSize: 13, fontWeight: "600" }}>{item.product_uom == 1 ? "Piece" : "Carton"}</Text>
                                </View>
                                <View style={{ alignItems: "center", marginLeft: "auto"}}>
                                    <Text style={styles.QtyHeading}>Quantity</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        {
                                            item.product_qty > 1 ? (
                                                <TouchableOpacity onPress={()=>handleDecrement(item.product_id)} style={{
                                                    width: 28,
                                                    height: 28,
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#FFF",
                                                    borderRadius: 35,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3,
                                                    },
                                                    shadowOpacity: 0.12,
                                                    shadowRadius: 4.65,
                                                    elevation: 6,
                                                }}>
                                                    <MaterialCommunityIcons size={16} color="#000" name="minus" />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={()=> checkItemZero(item.product_id)} style={{
                                                    width: 28,
                                                    height: 28,
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#FFF",
                                                    borderRadius: 35,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3,
                                                    },
                                                    shadowOpacity: 0.12,
                                                    shadowRadius: 4.65,
                                                    elevation: 6,
                                                }}>
                                                    <MaterialCommunityIcons size={16} color="#000" name="minus" />
                                                </TouchableOpacity>
                                            )
                                        }
                                        
                                        <Text style={{ paddingHorizontal:10, fontSize: 16, color: "#000" }}>{item.product_qty}</Text>
                                        <TouchableOpacity onPress={()=>handleIncrement(item.product_id)} style={{
                                            width: 28,
                                            height: 28,
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#FFF",
                                            borderRadius: 35,
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 4.65,
                                            elevation: 6,
                                        }}>
                                            <MaterialCommunityIcons size={16} color="#000" name="plus" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })                    
                ):(
                    <View style={{alignItems:"center", marginTop:60}}>
                        <Text style={{color:"#000", fontSize:22, marginBottom:10}}>Your Cart is empty!</Text>
                        {/* <Text style={{fontSize:16, color:"#7a7d81"}}>Add items to it now.</Text> */}
                        <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('Branch')}>
                            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Home</Text>
                        </TouchableOpacity>
                    </View>
                )
                
            }

            

            {/* <View style={{ paddingHorizontal: 15, paddingVertical: 8, marginTop: 25, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: "#626F7F", fontWeight: "600", fontSize: 16 }}>Subtotal</Text>
                <Text style={{ color: "#98A4B2", fontSize: 14 }}>$0.00</Text>
            </View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F3F3F3", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ color: "#626F7F", fontWeight: "600", fontSize: 16 }}>Total</Text>
                <Text style={{ color: "#98A4B2", fontSize: 14 }}>$0.00</Text>
            </View> */}
            {
                state.cartItems.length > 0 && (  
                <View style={{flexDirection:"row", alignItems: "center", marginBottom: 60 }}>                
                <TouchableOpacity style={[styles.btnSubmit, {backgroundColor:"#4fabff"}]} onPress={()=> navigation.navigate('Scanbarcode', {
                        deliverDate: getAllData.deliverDate,
                        deliveryNumber: getAllData.deliveryNumber,
                        org_id: getAllData.org_id,
                        vendor_id:getAllData.vendor_id,
                        activity:getAllData.activity
                    })
                    }>
                    <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={showAlert}>
                    <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Submit</Text>
                </TouchableOpacity>
                </View> 
                )
            }   
        </ScrollView>
        <Toast position='top' style={{backgroundColor:"#000"}} />
            {
                checkoutState.isLoading && (
                    <View style={{ flex: 1, position: "absolute", zIndex:3, left: 0, width: "100%", justifyContent: "center", height: "100%", justifyContent: 'center', alignItems: "center", backgroundColor: "rgba(255,255,255,0.4)" }}>
                        <View style={{
                            backgroundColor: "#FFF", paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 4.65,
                            elevation: 6,
                        }}>
                            <ActivityIndicator size="large" color="#7b0b0d" />
                        </View>
                    </View>
                )
            }
        </>
    )
}

export default Cart;

var styles = StyleSheet.create({
    mainWrapper: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        backgroundColor: '#FFF',
    },
    Heading: {
        fontSize: 26,
        fontWeight: "500",
        color: "#252525",
        textAlign: "center"
    },
    singleCartProduct: {
        paddingHorizontal: 12,
        paddingVertical: 20,
        backgroundColor: "#F9F9F9",
        borderRadius: 11,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    QtyHeading: {
        color: "#626F7F",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 8
    },
    btnSubmit: {
        width: "46%",
        height: 42,
        alignItems: "center",
        backgroundColor: "#1788F0",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        padding: 5,
        marginHorizontal:"2%"
    },
    btnSubmitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: "500",
        textTransform: "uppercase"
    }
});