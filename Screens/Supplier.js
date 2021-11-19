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

const Supplier = ({ navigation }) => {
    const state = useSelector(state => state.AllReducers);
    const [selectedVal, setSelectedVal] = useState('');
    const [fetchSupplier, setFetchSupplier] = useState([]);
    const dispatch = useDispatch();

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
            <Text style={styles.Heading}>Supplier</Text>
            <View style={styles.line}></View>
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
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('activity')}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={selectedVal == 0 ? true : false} style={[styles.btnSubmit, {opacity:selectedVal == 0 ? 0.7 : 1}]} onPress={() => navigation.navigate('deliveryinfo')}>
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
        paddingRight: 15,
        paddingLeft: 35
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
