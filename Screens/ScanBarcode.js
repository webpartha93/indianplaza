import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { afterScanProduct } from '../Redux/Actions/AllActions';

import Toast from 'react-native-toast-message';

const ScanBarcode = ({ navigation, route }) => {

    console.log('scanbarcode', route.params);
    const [screenWidth, setScreenWidth] = useState(null);
    const [screenHeight, setScreenHeight] = useState(null);

    const layoutChange = () => {
        setScreenWidth(Dimensions.get('window').width);
        setScreenHeight(Dimensions.get('window').height);
    }

    return (
        <SafeAreaView style={[styles.mainWrapper, { paddingHorizontal: screenHeight > screenWidth ? 30 : 20, paddingVertical: screenHeight > screenWidth ? 40 : 10 }]} onLayout={layoutChange}>
            <View style={{ position: "relative" }}>
                <Text style={styles.Heading}>Scan Barcode</Text>
                <View style={styles.line}></View>
            </View>
            <Toast position='top' style={{ backgroundColor: "#000" }} />
            <ScrollView>
                <TouchableOpacity style={{
                    backgroundColor: "#F2F1F8",
                    borderWidth: 1,
                    borderColor: "#E9E9E9",
                    borderRadius: 18,
                    alignItems: "center",
                    marginTop: screenHeight > screenWidth ? 30 : 15,
                    position: "relative",
                    overflow: "hidden",
                    padding:screenHeight > screenWidth ? 10 : 0
                }}
                    onPress={() => navigation.navigate('barcodecamera', {
                        deliverDate: route.params.deliverDate,
                        deliveryNumber: route.params.deliveryNumber,
                        org_id: route.params.org_id,
                        vendor_id: route.params.vendor_id,
                        activity: route.params.activity
                    })}
                >
                    <Image source={require('../assets/barcode.png')} />
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                    {/* <TouchableOpacity disabled={totalItems > 0 ? false : true} 
                style={[styles.btnSubmit, {backgroundColor:totalItems > 0 ? "#1788F0" : "#9d9d9d"}]} 
                onPress={()=> totalItems > 1 ? navigation.navigate('ProductList', {
                    allProducts:allProducts,
                    deliverDate:route.params.deliverDate,
                    deliveryNumber:route.params.deliveryNumber,
                    org_id:route.params.org_id,
                    vendor_id:route.params.vendor_id,
                    activity:route.params.activity
                }) : totalItems > 0 ? navigation.navigate('UnitMeasure',{
                    productId:productId,
                    deliverDate:route.params.deliverDate,
                    deliveryNumber:route.params.deliveryNumber,
                    org_id:route.params.org_id,
                    vendor_id:route.params.vendor_id,
                    activity:route.params.activity
                }) : navigation.navigate('Branch')}
                >
                    <Text style={{color:"#FFF", fontSize:18}}>PREV</Text>                  
                </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.btnSubmit}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScanBarcode;

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
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
