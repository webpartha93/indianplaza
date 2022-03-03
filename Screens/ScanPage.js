import React, { useState, useEffect, useRef } from 'react'
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
  PermissionsAndroid,
  Alert,
  Keyboard
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { useDispatch, useSelector } from 'react-redux';
import { afterScanProduct, assignBarCode } from '../Redux/Actions/AllActions';
import Toast from 'react-native-toast-message';
import BarcodeScanner from 'react-native-scan-barcode';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { handHeldScannerAction } from '../Redux/Actions/HandHeldScannerAction';


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


const ScanPage = ({ navigation, route }) => {
  const state = useSelector(state => state.AllReducers);
  const handHeldScannerState = useSelector(state => state.HandHeldReducer);
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState();
  const [scannerStatus, setScannerStatus] = useState('');

  console.log('scan product', state.allScanProducts);

  const isFocused = useIsFocused();
  // const onSuccess = e => {
  //   dispatch(afterScanProduct(e.data));
  //   setBarcode(e.data);
  // };
  //console.log('barcode_additional', route.params.additional_barcode);

  const barcodeNameRef = useRef();

  const torchMode = 'off';
  const cameraType = 'back';

  const barcodeReceived = (e) => {
    var brcode = e.data.replace(/(\r\n|\n|\r)/gm, '');
    setBarcode(brcode);
  }


  // useEffect(() => {
  //   if (barcode !== undefined) {
  //     dispatch(afterScanProduct(barcode));
  //   }
  // }, [barcode]);

  const handleScan = ()=> {
    dispatch(afterScanProduct(barcode));
  }


  useEffect(() => {
    if (state.allScanProducts.data !== undefined) {
      //console.log('dddd',state.allScanProducts.data);
      if (state.allScanProducts.data.length > 1) {
        navigation.navigate('ProductList', {
          barcode: barcode,
          dataLength: state.allScanProducts.data.length,
          allProducts: state.allScanProducts.data,
          deliverDate: route.params.deliverDate,
          deliveryNumber: route.params.deliveryNumber,
          org_id: route.params.org_id,
          vendor_id: route.params.vendor_id,
          activity: route.params.activity,
          additional_barcode: route.params.additional_barcode !== undefined ? route.params.additional_barcode : "",
          product_uom: route.params.product_uom
        });
      } else {
        navigation.navigate('UnknownItem', {
          barcode: barcode,
          dataLength: 1,
          deliverDate: route.params.deliverDate,
          deliveryNumber: route.params.deliveryNumber,
          org_id: route.params.org_id,
          vendor_id: route.params.vendor_id,
          activity: route.params.activity,
          additional_barcode: route.params.additional_barcode !== undefined ? route.params.additional_barcode : ""
        });

      }
      if (state.allScanProducts.data.length === 1) {
        navigation.navigate('ProductInfo', {
          barcode: barcode,
          singlebarcode: barcode,
          dataLength: state.allScanProducts.data.length,
          productId: state.allScanProducts.data[0]?.item_id,
          deliverDate: route.params.deliverDate,
          deliveryNumber: route.params.deliveryNumber,
          org_id: route.params.org_id,
          vendor_id: route.params.vendor_id,
          activity: route.params.activity,
          additional_barcode: route.params.additional_barcode !== undefined ? route.params.additional_barcode : "",
          product_uom: route.params.product_uom != undefined ? route.params.product_uom : state.allScanProducts.data[0]?.item_uom,
          norlamFlow: "true"
        });
      }
    }

  }, [state]);

  // for camera permission
  useEffect(() => {
    dispatch(handHeldScannerAction());
    Keyboard.dismiss;
  }, []);

  useEffect(() => {
    if (handHeldScannerState.handHeldScannerStatus !== "") {
      setScannerStatus(handHeldScannerState.handHeldScannerStatus);
    }
  }, [handHeldScannerState]);



  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      {/* <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker={true}
            reactivate={true}
        /> */}
      <TouchableOpacity onPress={() => { navigation.goBack(), dispatch({ type: "RESET_SCAN_DATA" }) }} style={{ position: "absolute", top: 15, left: 15, zIndex: 3, backgroundColor: "rgba(255,255,255,0.8)", padding: 14, borderRadius: 30 }}>
        <MaterialIcons name='arrow-back' color="#000" size={20} />
      </TouchableOpacity>

      {
        state.isLoading && (
          <View style={{ flex: 1, position: "absolute", zIndex: 3, left: 0, width: "100%", justifyContent: "center", height: "100%", justifyContent: 'center', alignItems: "center", backgroundColor: "rgba(255,255,255,0.4)" }}>
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

      {
        handHeldScannerState.isLoading && (
          <View style={{ flex: 1, position: "absolute", zIndex: 3, left: 0, width: "100%", justifyContent: "center", height: "100%", justifyContent: 'center', alignItems: "center", backgroundColor: "#FFF" }}>
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

      {
        scannerStatus !== 0 ? (
          <View style={{ width: "100%", paddingHorizontal: 25, flexDirection:"row", flexWrap:"wrap", justifyContent:"center" }}>
            <TextInput returnKeyType="next"
              autoFocus={true}
              ref={barcodeNameRef}
              keyboardType="number-pad"
              onSubmitEditing={() => {
                barcodeNameRef.current.focus();
              }}
              onChangeText={(e) => setBarcode(e)}
              blurOnSubmit={false} value={barcode} placeholderTextColor="#000" style={{ width: "100%", backgroundColor: "#FFF", color: "#000", paddingHorizontal: 12 }} />
                <TouchableOpacity style={styles.btnSubmit} onPress={handleScan}>
                  <Text style={{ color: "#FFF", fontSize: 18 }}>SCAN</Text>
                </TouchableOpacity>
          </View>
        ) : (
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
            viewFinderShowLoadingIndicator={state.isLoading}
          />
        )
      }

      {/* <BarcodeScanner
        onBarCodeRead={barcodeReceived}
        style={{ flex: 1 }}
        torchMode={torchMode}
        cameraType={cameraType}
        showViewFinder={true}
        viewFinderBorderColor='#cbff01'
        viewFinderWidth={300}
        viewFinderHeight={140}
        viewFinderBorderLength={80}
        viewFinderShowLoadingIndicator={state.isLoading}
      /> */}

      {/* <Toast position='top' style={{ backgroundColor: "#000" }} /> */}


    </View>
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
  btnSubmit: {
    width:120,
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