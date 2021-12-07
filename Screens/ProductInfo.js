import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProductInfo } from '../Redux/Actions/AllActions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Actions/cartAction';
import { doCheckout } from '../Redux/Actions/CheckoutAction';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = ({ navigation, route }) => {
    
    const state = useSelector(state => state.AllReducers.productDetails);
    const statecart = useSelector(state => state.CartReducer);

    const [product_qty, setProduct_qty] = useState(1);
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [empId, setEmpId] = useState('');
    const product_id = route.params.productId;
    const product_uom = route.params.product_uom;
    const activity = route.params.activity;
    const getAllData = route.params;

    //console.log('cartitems', statecart.cartItems);

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

    const handleIncrement = () => {

        setProduct_qty(prevVal => prevVal + 1);
    }
    const handleDecrement = () => {
        setProduct_qty(prevVal => prevVal - 1);
    }

    const handleNumberChange = (e)=> {
        var numberVal = Number(e);
        console.log(numberVal);
        if(e <= 1){
            setProduct_qty(1);
        }else{
            setProduct_qty(numberVal);
        }        
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductInfo(route.params.productId));
        readItemFromStorage().then((value) => setEmpId(value));
    }, [])

    useEffect(() => {
        if (state.data !== undefined) {
            setProductName(state.data.item_code);
            setProductDesc(state.data.item_description);
        }
    }, [state])



    
    const handleAddToCart = () => {        
        dispatch(addToCart({
            productData: {
                productName,
                product_qty,
                product_id,
                product_uom,
                activity
            },
            getAllData
        }))        
    }

    const doCheckOut = ()=> {
        const updatedCartItem = statecart.cartItems.map(({productName,...rest}) => ({...rest}));
        //console.log('result', getAllData);
        dispatch(doCheckout({
            getAllData,
            updatedCartItem,
            empId
        }));
        dispatch({type:"RESET_ADDED_CART"});
    }

    useEffect(()=>{
        console.log('catddd', statecart.isAddedCartItem);
        if(statecart.isAddedCartItem){
            doCheckOut();            
            navigation.navigate('activity', {
                org_id:route.params.org_id,
            })
        }
        //
    },[statecart])

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
                { text: "Yes", onPress: () => handleAddToCart() }
            ]
        );

    return (
        <ScrollView style={styles.mainWrapper}>
            <View style={{position:"relative"}}>
            <Text style={styles.Heading}>Product Info</Text>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={()=> navigation.navigate('Branch')} style={{ position: "absolute", top:4, right: 0 }}>
                <MaterialIcons size={32} color="#1788F0" name="home" />
            </TouchableOpacity>
            </View>
            <View style={{ borderRadius: 10, overflow: "hidden", marginTop: 30, backgroundColor: "#F9F9F9" }}>
                <View style={styles.Label}>
                    <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Product Code</Text>
                </View>
                <View style={styles.Desc}>
                    <Text style={{ color: "#626F7F", fontSize: 13 }}>{productName}</Text>
                </View>
                <View style={styles.Label}>
                    <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Description</Text>
                </View>
                <View style={styles.Desc}>
                    <Text style={{ color: "#626F7F", fontSize: 13 }}>{productDesc}</Text>
                </View>
                <View style={styles.Label}>
                    <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Unit of Measure</Text>
                </View>
                <View style={styles.Desc}>
                    <Text style={{ color: "#626F7F", fontSize: 13 }}>{product_uom > 1 ? "Carton" : "Piece" }</Text>
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 30 }}>
                <Text style={styles.QtyHeading}>Quantity</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity disabled={product_qty > 1 ? false : true} onPress={handleDecrement} style={{
                        width: 35,
                        height: 35,
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
                        <MaterialCommunityIcons size={20} color="#000" name="minus" />
                    </TouchableOpacity>
                    {/* <Text style={{ paddingHorizontal: 20, fontSize: 20, color: "#000" }}>{product_qty}</Text> */}
                    <TextInput keyboardType = 'numeric' defaultValue={product_qty.toString()} value={product_qty.toString()} onChangeText={(e)=> handleNumberChange(e)} style={{ paddingHorizontal: 20, fontSize: 20, color: "#000" }} />
                    <TouchableOpacity onPress={handleIncrement} style={{
                        width: 35,
                        height: 35,
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
                        <MaterialCommunityIcons size={20} color="#000" name="plus" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.goBack()}>
                    <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={() => 
                    {
                        navigation.navigate('Scanbarcode', {
                        deliverDate: route.params.deliverDate,
                        deliveryNumber: route.params.deliveryNumber,
                        org_id: route.params.org_id,
                        vendor_id: route.params.vendor_id,
                        activity:activity,
                        barcode: ''
                    })
                    dispatch(addToCart({
                        productData: {
                            productName,
                            product_qty,
                            product_id,
                            product_uom,
                            activity
                        },
                        getAllData
                    }))
                    dispatch({type:"RESET_ADDED_CART"})
                }}>
                    <MaterialCommunityIcons size={30} color="#FFF" name="barcode-scan" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={showAlert}>
                    <Text style={{ color: "#FFF", fontSize: 18 }}>DONE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ProductInfo;

var styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 40,
        backgroundColor: '#FFF'
    },
    Heading: {
        fontSize: 26,
        fontWeight: "500",
        color: "#252525"
    },
    line: {
        width: 34,
        height: 4,
        backgroundColor: "#1788F0",
        borderRadius: 3,
        marginTop: 10
    },
    Label: {
        backgroundColor: "#F2F1F8",
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    Desc: {
        paddingHorizontal: 14,
        paddingVertical: 12
    },
    QtyHeading: {
        color: "#626F7F",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 15
    },
    btnSubmit: {
        backgroundColor: "#1788F0",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        paddingHorizontal: 18,
        paddingVertical: 8
    },
    btnSubmitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: "500",
        textTransform: "uppercase"
    }
});
