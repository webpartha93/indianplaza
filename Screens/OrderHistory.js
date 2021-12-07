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
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHistory } from '../Redux/Actions/HistoryAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderHistory = ({ navigation }) => {
    const state = useSelector(state => state.HistoryReducers);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [empId, setEmpId] = useState('');
    const [isloading, setIsloading] = useState(true);

    const readItemFromStorage = async () => {
        try {
            const loggedInUser = await AsyncStorage.getItem("uuid");
            const parseVal = JSON.parse(loggedInUser);
            if (loggedInUser !== null) {
                setEmpId(parseVal);
            } else {
                setEmpId("");
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    useEffect(() => {
        readItemFromStorage();
    }, []);

    useEffect(() => {
        if (empId !== undefined) {
            dispatch(getHistory(empId));
            setTimeout(()=> {
                setIsloading(false);
            }, 1000);
        }
    }, [empId, isFocused]);

    //console.log('length',state.allHistory.data?.length);
    
    if(isloading){
        return(
          <View style={{flex:1, justifyContent:'center', alignItems:"center", backgroundColor:"#FFF"}}>
            <ActivityIndicator size="large" color="#7b0b0d" />
          </View>
        )
      };

    return (
        <View style={styles.mainWrapper}>
            <View style={{position:"relative"}}>
                <Text style={styles.Heading}>History</Text>
                <View style={styles.line}></View>
                <TouchableOpacity onPress={()=> navigation.navigate('Branch')} style={{ position: "absolute", top:4, right: 0 }}>
                    <MaterialIcons size={32} color="#1788F0" name="home" />
                </TouchableOpacity>
            </View>            
            <ScrollView style={{ flex: 1, paddingTop:25 }}>
                {
                    state.allHistory.data?.map((item, index, arr) => {
                        return (
                            arr.length > 0 ? (
                                <TouchableOpacity style={styles.Row} key={index} onPress={() => navigation.navigate('SingleHistory', {
                                    shipment_line_id:item.shipment_line_id
                                })}>
                                    <View style={{ width: "100%" }}>
                                        <Text style={{ color: "#1f1f1f", fontWeight: "700", fontSize: 15, marginBottom: 5 }}>Shipment Number: {item.shipment_number}</Text>
                                        <Text style={{ color: "#6c6c6c", fontSize: 14, marginBottom: 7 }}>Delivery Date: {item.delivery_date}</Text>
                                    </View>
                                </TouchableOpacity>
                            ):(
                                <View style={{marginTop:30, alignItems:'center'}}>
                                    <Text style={{color:"#000", fontSize:20}}>No Orders available</Text>
                                    <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('Branch')}>
                                        <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Home</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        )

                    })
                   
                }


            </ScrollView>
        </View>
    )
}

export default OrderHistory;

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
        borderBottomColor: "#e1e1e1",
        borderBottomWidth: 1,
        borderStyle: "solid",
        marginBottom:15
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