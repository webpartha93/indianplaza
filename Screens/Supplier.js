import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { allSupplier } from '../Redux/Actions/AllActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Supplier = ({ navigation, route }) => {
    const state = useSelector(state => state.AllReducers);
    const [selectedVal, setSelectedVal] = useState('');
    const [fetchSupplier, setFetchSupplier] = useState([]);
    const dispatch = useDispatch();
    console.log('supplier', route.params)

    useEffect(() => {
        dispatch(allSupplier());
    }, []);

    useEffect(() => {
        if (state.allSupplier.data !== undefined) {
            setFetchSupplier(state.allSupplier.data.suppliers_query);
        }
    }, [state]);

    const supplierItems = () => {
        return (
            fetchSupplier.map((item, index) => {
                return (
                    <Picker.Item key={index} label={item.vendor_name} value={item.vendor_id} />
                )
            })
        )
    }

    return (
        <View style={styles.mainWrapper}>
            <View style={{ position: "relative" }}>
                <Text style={styles.Heading}>Supplier</Text>
                <View style={styles.line}></View>
                <TouchableOpacity onPress={() => navigation.navigate('Branch')} style={{ position: "absolute", top: 4, right: 0 }}>
                    <MaterialIcons size={32} color="#1788F0" name="home" />
                </TouchableOpacity>
            </View>

            <View style={styles.formWrapper}>
                <Text style={styles.formLabel}>Select Supplier</Text>
                <View style={styles.inputWrapper}>
                    <Icon size={16} color="#626F7F" name="user" style={{ position: "absolute", left: 15, top: 16 }} />
                    <Picker
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
                    </Picker>
                    {/* <TextInput placeholder="Type Supplier" placeholderTextColor="#000" style={{paddingLeft:35}} />
                    <View style={{ width: "100%", height:400, position:"absolute", top:"100%", left:0, right:0, backgroundColor: "#ededed", overflow: "hidden", borderRadius: 30, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 8 }}>
                        <ScrollView keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false}>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ color: "#000", fontSize: 15 }}>Test</Text>
                            </View>
                        </ScrollView>
                    </View> */}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.goBack()}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={selectedVal == 0 ? true : false} style={[styles.btnSubmit, { backgroundColor: selectedVal == 0 ? "#9d9d9d" : "#1788F0" }]} onPress={() => navigation.navigate('deliveryinfo', {
                        org_id: route.params.org_id,
                        activity: route.params.activity,
                        vendor_id: selectedVal
                    })}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        position:"relative",
        zIndex:99
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
