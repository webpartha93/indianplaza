import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { allSupplier, searchSupplier } from '../Redux/Actions/AllActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Supplier = ({ navigation, route }) => {
    const state = useSelector(state => state.AllReducers);
    //const [selectedVal, setSelectedVal] = useState('');
    const [vendorid, setVendorid] = useState('');
    const [inputVal, setInputVal] = useState('');
    //const [dataSupplier, setDataSupplier] = useState([]);
    const [isVisible, setIsvisible] = useState(false);
    const [screenWidth, setScreenWidth] = useState(null);
    const [screenHeight, setScreenHeight] = useState(null);
    const dispatch = useDispatch();
    console.log('supplier', route.params)

    useEffect(() => {
        dispatch(allSupplier());
    }, []);

    // useEffect(() => {
    //     if (state.allSupplier.data !== undefined) {
    //         setDataSupplier(state.allSupplier.data.suppliers_query);
    //     }

    // }, [state]);

    useEffect(() => {
        dispatch(searchSupplier(inputVal));
    }, [inputVal]);

    // const supplierItems = () => {
    //     return (
    //         dataSupplier.map((item, index) => {
    //             return (
    //                 <Picker.Item key={index} label={item.vendor_name} value={item.vendor_id} />
    //             )
    //         })
    //     )
    // }

    const layoutChange = () => {
        setScreenWidth(Dimensions.get('window').width);
        setScreenHeight(Dimensions.get('window').height);
    }

    return (
        <SafeAreaView style={[styles.mainWrapper, { paddingHorizontal: screenHeight > screenWidth ? 30 : 20, paddingVertical: screenHeight > screenWidth ? 40 : 10 }]} onLayout={layoutChange}>
            <View style={{ position: "relative" }}>
                <Text style={styles.Heading}>Supplier</Text>
                <View style={styles.line}></View>
            </View>
            <View style={[styles.formWrapper, { paddingVertical: screenHeight > screenWidth ? 30 : 20 }]}>
                <Text style={styles.formLabel}>Select Supplier</Text>
                <View style={styles.inputWrapper}>
                    <Icon size={16} color="#626F7F" name="user" style={{ position: "absolute", left: 15, top: 16 }} />
                    {/* <Picker
                            selectedValue={selectedVal}
                            style={{color:"#000"}}
                            dropdownIconColor="#000"
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedVal(itemValue)
                            }>
                            <Picker.Item label="Select Supplier" value="0" />
                            {
                                supplierItems()
                            }
                        </Picker> */}
                    <TextInput value={inputVal} onChangeText={(e) => { setInputVal(e), setIsvisible(true) }} placeholder="Type Supplier" placeholderTextColor="#626F7F" style={{ paddingLeft: 35, color: "#000" }} />
                </View>
                {
                    state.fetchSupplier.data !== undefined && (
                        state.fetchSupplier.data.length > 0 && (

                            isVisible && (
                                <View style={{ width: "100%", height:screenHeight > screenWidth ? 200 : 110, position: "absolute", overflow: "hidden", top: screenHeight > screenWidth ? "73%" : "65%", zIndex: 99, left: 0, right: 0, backgroundColor: "#ededed", borderRadius: 30, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 8 }}>
                                    <ScrollView>
                                        {
                                            state.fetchSupplier.data?.map((item, index, arr) => {
                                                if (arr.length - 1 === index) {
                                                    return (
                                                        <TouchableOpacity onPress={() => { setInputVal(item.vendor_name), setIsvisible(false), setVendorid(item.vendor_id) }} key={index} style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                                            <Text style={{ color: "#000", fontSize: 15 }}>{item.vendor_name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                } else {
                                                    return (
                                                        <TouchableOpacity onPress={() => { setInputVal(item.vendor_name), setIsvisible(false), setVendorid(item.vendor_id) }} key={index} style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                                            <Text style={{ color: "#000", fontSize: 15 }}>{item.vendor_name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                }


                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )

                        )

                    )
                }


                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.goBack()}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={vendorid == '' ? true : false} style={[styles.btnSubmit, { backgroundColor: vendorid == '' ? "#9d9d9d" : "#1788F0" }]} onPress={() => navigation.navigate('deliveryinfo', {
                        org_id: route.params.org_id,
                        activity: route.params.activity,
                        vendor_id: vendorid
                    })}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Supplier;

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
    formWrapper: {
        paddingVertical: 30
    },
    formLabel: {
        fontSize: 15,
        fontWeight: "500",
        color: '#626F7F',
        marginBottom: 10
    },
    inputWrapper: {
        width: "100%",
        backgroundColor: "#F2F1F8",
        borderRadius: 30,
        position: "relative",
        zIndex: 99
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
