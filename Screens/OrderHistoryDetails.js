import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    BackHandler,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
import { getHistoryDetails } from '../Redux/Actions/HistoryAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderHistoryDetails = ({ navigation, route }) => {
    const state = useSelector(state => state.HistoryReducers);
    const [isLoading, setIsloading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(null);
    const [screenHeight, setScreenHeight] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistoryDetails(route.params.shipment_header_id));
        setScreenWidth(Dimensions.get('window').width);
        setScreenHeight(Dimensions.get('window').height);
    }, []);

    useEffect(() => {
        setIsloading(state.isLoading);
    }, [state]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, position: "absolute", zIndex: 2, left: 0, width: "100%", justifyContent: "center", height: "100%", justifyContent: 'center', alignItems: "center", backgroundColor: "#FFF" }}>
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
    };


    const layoutChange = () => {
        setScreenWidth(Dimensions.get('window').width);
        setScreenHeight(Dimensions.get('window').height);
    }

    //console.log('historydata', state.historyDetails.data.lines);
    return (
        <>
            <SafeAreaView style={[styles.mainWrapper, { paddingHorizontal: screenHeight > screenWidth ? 30 : 20, paddingVertical: screenHeight > screenWidth ? 40 : 10 }]} onLayout={layoutChange}> 
                <View style={{ paddingTop: 25, paddingBottom: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack(), dispatch({ type: "RESET_HISTORY_DETAILS" }) }} style={{ flexDirection: "row", alignItems: "center" }}><Icon size={26} color="#000" name="angle-left" /><Text style={{ color: "#000", fontSize: 18, marginLeft: 8 }}> Back</Text></TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1, paddingTop: 15 }}>
                    {
                        state.historyDetails.data !== undefined && (
                            <View style={styles.Row}>
                                <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={{ color: "#626F7F", fontSize: 17, marginBottom: 5, fontWeight: "700" }}>#{state.historyDetails.data.shipment_number}</Text>
                                    <Text style={{ color: "green", fontSize: 15, position: "absolute", top: 5, right: 10 }}>{state.historyDetails.data.status}</Text>
                                    <Text style={{ color: "#626F7F", fontSize: 14, marginBottom: 5 }}>{state.historyDetails.data.delivery_date}</Text>
                                    <Text style={{ color: "#626F7F", fontSize: 14, marginBottom: 5 }}>{state.historyDetails.data.delivery_note_num}</Text>
                                    <Text style={{ color: "#626F7F", fontSize: 14, marginBottom: 5 }}>{state.historyDetails.data.org_name}</Text>
                                    <Text style={{ color: "#626F7F", fontSize: 14, marginBottom: 5 }}>{state.historyDetails.data.vendor_name}</Text>
                                    <View style={{marginTop:20}}>
                                    <View style={{
                                        borderTopWidth:3, borderTopColor:"#1788F0",
                                        backgroundColor: "#FFF", paddingVertical: 15}}>
                                        {
                                            state.historyDetails.data.lines.map((item, index, arr) => {
                                                if (arr.length - 1 === index) {
                                                    return (
                                                        <View key={index} style={{ position: "relative", paddingVertical: 10 }}>
                                                            <Text style={{ color: "#626F7F", fontSize: 15, marginBottom: 5, fontWeight: "700" }}>{item.item_description}</Text>
                                                            <Text style={{ color: "#626F7F", fontSize: 17, fontWeight: "700", position: "absolute", top: 10, right: 0 }}>
                                                                Qty: {Math.floor(item.quantity)}</Text>
                                                            <Text style={{ color: "#626F7F", fontSize: 14, marginBottom: 7 }}>{item.measure_name}</Text>
                                                        </View>
                                                    )
                                                } else {
                                                    return (
                                                        <View key={index} style={{ position: "relative", paddingVertical: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                                            <Text style={{ color: "#626F7F", fontSize: 15, marginBottom: 5, fontWeight: "700" }}>{item.item_description}</Text>
                                                            <Text style={{ color: "#626F7F", fontSize: 17, fontWeight: "700", position: "absolute", top: 10, right: 0 }}>
                                                                Qty: {Math.floor(item.quantity)}</Text>
                                                            <Text style={{ color: "#626F7F", fontSize: 14, marginBottom: 7 }}>{item.measure_name}</Text>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }
                                    </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default OrderHistoryDetails;

var styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
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
    Row: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15,
        marginBottom: 15
    },
    btnSubmit: {
        width: "100%",
        height: 42,
        alignItems: "center",
        backgroundColor: "#1788F0",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        padding: 5
    },
    btnSubmitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: "500",
        textTransform: "uppercase"
    }
});