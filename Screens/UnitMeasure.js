import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator
} from 'react-native';

import { getProductInfo } from '../Redux/Actions/AllActions';
import { useDispatch, useSelector } from 'react-redux';

const UnitMeasure = ({ navigation, route }) => {
    console.log("unitmeasure", route.params.dataLength);

    const state = useSelector(state => state.AllReducers);
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');

    const [loading, setIsloading] = useState(false);

    const unitsCategory = [
        {
            "catName": "Piece",
            "id": "1"
        },
        {
            "catName": "Carton",
            "id": "2"
        }
    ]

    const [id, setId] = useState();

    useEffect(() => {
        dispatch(getProductInfo(route.params.productId));
    }, []);

    useEffect(() => {
        if (state.productDetails.data !== undefined) {
            setProductName(state.productDetails.data.item_code);
            setProductDesc(state.productDetails.data.item_description);
        }
        setIsloading(state.isLoading);       
    }, [state])


    const handleClick = (e) => {
        setId(e);
        navigation.navigate('ProductInfo', {
            productId: route.params.productId,
            deliverDate: route.params.deliverDate,
            deliveryNumber: route.params.deliveryNumber,
            org_id: route.params.org_id,
            vendor_id: route.params.vendor_id,
            activity: route.params.activity,
            product_uom: e
        });
        dispatch({ type:"RESET_SCAN_DATA"})
    }

    return (
        <>
        <View style={styles.mainWrapper}>                    
            <View style={{ paddingHorizontal: 30, paddingTop: 40 }}>
                <Text style={styles.Heading}>Unit of Measure</Text>
                <View style={styles.line}></View>
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
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: "row", marginHorizontal: -10 }}>
                        {
                            unitsCategory.map((item, index) => {
                                return (
                                    <View style={styles.btnBox} key={index}>
                                        <TouchableOpacity onPress={() => handleClick(index + 1)} style={{
                                            borderRadius: 10,
                                            backgroundColor: item.id == id ? "#3623B7" : "#FFF",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: 140,
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 4.65,
                                            elevation: 6,
                                        }}>
                                            {/* <View style={{width:60, height:60, backgroundColor:"rgba(23,136,240,0.46)", borderRadius:16, flexDirection:"column", justifyContent:"center", alignItems:"center", marginBottom:16}}>
                                <Image source={require('../assets/pieces.png')}/>
                            </View> */}

                                            <View style={{ width: 60, height: 60, backgroundColor: item.id == id ? "rgba(23,136,240,0.46)" : "rgba(23,136,240,0.15)", borderRadius: 16, flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                                                {
                                                    index == 0 ? (
                                                        item.id == id ? (<Image source={require('../assets/pieces.png')} />) : (<Image source={require('../assets/pieces-hover.png')} />)
                                                    ) : (
                                                        item.id == id ? (<Image source={require('../assets/carton-hover.png')} />) : (<Image source={require('../assets/carton.png')} />)
                                                    )
                                                }

                                            </View>

                                            <Text style={{ fontSize: 15, fontWeight: "600", color: item.id == id ? "#FFF" : "#626F7F" }}>{item.catName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })

                        }

                    </View>
                </View>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => {navigation.navigate('Scanbarcode', {
                        deliverDate: route.params.deliverDate,
                        deliveryNumber: route.params.deliveryNumber,
                        org_id: route.params.org_id,
                        vendor_id: route.params.vendor_id,
                        activity: route.params.activity,
                    }), dispatch({ type:"RESET_SCAN_DATA"})}}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                    </TouchableOpacity>
                </View>
            </View>                    
        </View>
        {
                loading && (
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

export default UnitMeasure;

var styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        position: "relative"
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
    btnBox: {
        width: "50%",
        paddingHorizontal: 10,
        marginBottom: 20
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