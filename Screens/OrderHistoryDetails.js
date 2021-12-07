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
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
import { getHistoryDetails } from '../Redux/Actions/HistoryAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderHistoryDetails = ({ navigation, route }) => {
    const state = useSelector(state => state.HistoryReducers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistoryDetails(route.params.shipment_line_id));
    }, []);

    //console.log('historydata', state);
    return (
        <View style={styles.mainWrapper}>
            <View style={{ position: "relative" }}>
                <Text style={styles.Heading}>History</Text>
                <View style={styles.line}></View>
                <TouchableOpacity onPress={() => navigation.navigate('Branch')} style={{ position: "absolute", top: 4, right: 0 }}>
                    <MaterialIcons size={32} color="#1788F0" name="home" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, paddingTop: 25 }}>
                {
                    state.historyDetails.data !== undefined && (
                        <View style={styles.Row}>
                            <View style={{ width: "100%" }}>
                                <Text style={{ color: "#1f1f1f", fontWeight: "700", fontSize: 15, marginBottom: 5 }}>Quantity: {state.historyDetails.data.quantity}</Text>
                                <Text style={{ color: "#6c6c6c", fontSize: 14, marginBottom: 7 }}>Date &amp; Time: {state.historyDetails.data.add_datetime}</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default OrderHistoryDetails;

var styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
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