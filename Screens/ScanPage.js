import React, {useState} from 'react'
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
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanPage = ({navigation, route}) => {
    const [barcodeVal, setBarcodeVal] = useState();
    const onSuccess = e => {
        setBarcodeVal(e.data);
        if(e.data){
            navigation.navigate('Scanbarcode', {
                barcode:e.data,
                deliverDate:route.params.deliverDate,
                deliveryNumber:route.params.deliveryNumber,
                org_id:route.params.org_id,
                vendor_id:route.params.vendor_id,
                activity:route.params.activity
            });
        }
   };
    return (
        <QRCodeScanner
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker={true}
        />
    )
}

export default ScanPage
