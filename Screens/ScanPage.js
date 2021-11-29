import React, {useState, useEffect} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    View,
  } from 'react-native';
  import { useIsFocused } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { useDispatch, useSelector } from 'react-redux';
import { afterScanProduct } from '../Redux/Actions/AllActions';
import Toast from 'react-native-toast-message';

const ScanPage = ({navigation, route}) => {
    const state = useSelector(state=> state.AllReducers);
    const dispatch = useDispatch();
    const [barcode, setBarcode] = useState();
    const isFocused = useIsFocused();
    const [dataLength, setDataLength] = useState();
    const onSuccess = e => {
        dispatch(afterScanProduct(e.data));
        setBarcode(e.data);
   };

//    barcode:e.data,
//                 deliverDate:route.params.deliverDate,
//                 deliveryNumber:route.params.deliveryNumber,
//                 org_id:route.params.org_id,
//                 vendor_id:route.params.vendor_id,
//                 activity:route.params.activity


   useEffect(() => {    
    if (state.allScanProducts.data !== undefined) {
        if(state.allScanProducts.data.length > 1 ){
            navigation.navigate('ProductList',{
                barcode:barcode,
                dataLength:state.allScanProducts.data.length,
                allProducts:state.allScanProducts.data,
                deliverDate:route.params.deliverDate,
                deliveryNumber:route.params.deliveryNumber,
                org_id:route.params.org_id,
                vendor_id:route.params.vendor_id,
                activity:route.params.activity
            });
        }else{
            navigation.navigate('UnitMeasure', {
                barcode:barcode,
                dataLength:state.allScanProducts.data.length,
                productId:state.allScanProducts.data[0]?.item_id,
                deliverDate:route.params.deliverDate,
                deliveryNumber:route.params.deliveryNumber,
                org_id:route.params.org_id,
                vendor_id:route.params.vendor_id,
                activity:route.params.activity
            });
        }

        if (state.allScanProducts.data.length === 0) {
            Toast.show({
                type: 'success',
                text1: "No Products Found. Scan again please",
            });
        }
    }    
}, [state]);




    return (
        <>
        <QRCodeScanner
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker={true}
        />
        <Toast position='top' style={{ backgroundColor: "#000" }} />
        </>
    )
}

export default ScanPage
