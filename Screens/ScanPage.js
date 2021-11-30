import React, {useState, useEffect, useRef} from 'react'
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
    PermissionsAndroid
  } from 'react-native';
  import { useIsFocused } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { useDispatch, useSelector } from 'react-redux';
import { afterScanProduct } from '../Redux/Actions/AllActions';
import Toast from 'react-native-toast-message';
import BarcodeScanner from 'react-native-scan-barcode';


const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


const ScanPage = ({navigation, route}) => {
    const state = useSelector(state=> state.AllReducers);
    const dispatch = useDispatch();
    const [barcode, setBarcode] = useState();
    const isFocused = useIsFocused();
    const onSuccess = e => {
        dispatch(afterScanProduct(e.data));
        setBarcode(e.data);
   };

   const torchMode = 'off';
   const cameraType = 'back';
 
    const barcodeReceived = (e)=> {
        dispatch(afterScanProduct(e.data));
        setBarcode(e.data);
    }
    
   useEffect(() => {       
    if (state.allScanProducts.data !== undefined) { 
        console.log('dddd',state.allScanProducts.data);
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
            Toast.show({
                type: 'error',
                text1: "No Products Found. Scan again please",
                autoHide:true,
                onHide: () => {state.allScanProducts=""}
            });
            
        }
         if(state.allScanProducts.data.length === 1){
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
    }  
    
}, [state]);

    useEffect(()=>{
        requestCameraPermission();
    },[]);

    return (
        <>
        {/* <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker={true}
            reactivate={true}
        /> */}
        {
            state.isLoading && (
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
        <BarcodeScanner
            onBarCodeRead={barcodeReceived}
            style={{ flex: 1 }}
            torchMode={torchMode}
            cameraType={cameraType}
            showViewFinder={true}
            viewFinderBorderColor='#cbff01'
            viewFinderWidth={300}
            viewFinderHeight={140}
            viewFinderBorderLength={80}
            // viewFinderShowLoadingIndicator={state.isLoading}
        />
        <Toast position='top' style={{ backgroundColor: "#000" }} />
        </>
    )
}

export default ScanPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });