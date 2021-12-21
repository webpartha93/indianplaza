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
  Alert
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { unknownItems } from '../Redux/Actions/UnknownItemAction';

import AsyncStorage from '@react-native-async-storage/async-storage';


const localStorageData = async (value) => {
  try {
    await AsyncStorage.setItem('unknownbarcode', value)
  } catch (e) {
    // saving error
  }
}


const UnknownItemPage = ({ navigation, route }) => {
  const unknownItemState = useSelector(state => state.UnknownItemReducers);
  const dispatch = useDispatch();
  const [unknownItemId, setUnknownItemId] = useState('');
  const [firstBarcode, setFirstBarcode] = useState();
  const [isShow, setIsShow] = useState(true);
  const isFocused = useIsFocused();
  console.log("barcodeNew", route.params.barcode);
  console.log('firstBarcode', firstBarcode);

  const readItemFromStorage = async () => {
    try {
      const unkwnBarcode = await AsyncStorage.getItem("unknownbarcode");
      if (unkwnBarcode !== null) {        
        return unkwnBarcode;
      }
    } catch (e) {
    }
  }

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('unknownbarcode');
    } catch(e) {
      // clear error
    }
  
  }

  useEffect(() => {
    dispatch(unknownItems());
    readItemFromStorage().then((value) => setFirstBarcode(value));
  }, []);

  useEffect(() => {
    console.log('unknwn', unknownItemState.productId);
    setUnknownItemId(unknownItemState.productId);    
  }, [unknownItemState]);

  const handleUnknownItems = () => {
    removeValue();
    setIsShow(true);
    navigation.navigate('UnitMeasure', {
      barcode: route.params.barcode,
      dataLength: route.params.dataLength,
      productId: unknownItemId,
      deliverDate: route.params.deliverDate,
      deliveryNumber: route.params.deliveryNumber,
      org_id: route.params.org_id,
      vendor_id: route.params.vendor_id,
      activity: route.params.activity
    });
    dispatch({ type: "RESET_SCAN_DATA" })
  }

  const handleUnpack = ()=> {
    localStorageData(route.params.barcode);
    setIsShow(false);
    navigation.navigate('barcodecamera', {
      deliverDate: route.params.deliverDate,
      deliveryNumber: route.params.deliveryNumber,
      org_id: route.params.org_id,
      vendor_id: route.params.vendor_id,
      activity: route.params.activity
    });
    dispatch({ type: "RESET_SCAN_DATA" });
  }


  return (
    <View style={styles.mainWrapper}>
      <View style={{ position: "relative", flex:1 }}>
        <Text style={styles.Heading}>Product not found</Text>
        <View style={styles.line}></View>
      </View>
      <View style={{flex:6, flexDirection: "column", justifyContent:"center", alignItems: "center", flexWrap:"wrap" }}>
        <View style={{width:"100%", alignItems:"center"}}>
          <TouchableOpacity style={styles.btnSubmit} onPress={() => { navigation.goBack(); removeValue(); dispatch({ type: "RESET_SCAN_DATA" }) }}>
            <Text style={{ color: "#FFF", fontSize: 16 }}>BACK</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:"100%", alignItems:"center"}}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleUnknownItems}>
            <Text style={{ color: "#FFF", fontSize: 16 }}>UNKNOWN ITEM</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:"100%", alignItems:"center"}}>
          <TouchableOpacity style={styles.btnSubmit} onPress={() =>
          {
            removeValue();
            navigation.navigate('barcodecamera', {
            deliverDate: route.params.deliverDate,
            deliveryNumber: route.params.deliveryNumber,
            org_id: route.params.org_id,
            vendor_id: route.params.vendor_id,
            activity: route.params.activity
          }); 
          dispatch({ type: "RESET_SCAN_DATA" })
          }}>
            <Text style={{ color: "#FFF", fontSize: 16 }}>SCAN AGAIN</Text>
          </TouchableOpacity>
          {
            isShow && (
              <TouchableOpacity style={styles.btnSubmit} onPress={handleUnpack}>
                <Text style={{ color: "#FFF", fontSize: 16 }}>UNPACK &amp; SCAN</Text>
              </TouchableOpacity>
            )
          }
          
        </View>
        
      </View>
    </View>
  )
}

export default UnknownItemPage

const styles = StyleSheet.create({
  mainWrapper: {
    flex:1,
    flexDirection:"column",
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
  Label: {
    backgroundColor: "#F2F1F8",
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  Desc: {
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  QtyHeading: {
    color: "#626F7F",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 15
  },
  btnSubmit: {
    width:"55%",
    backgroundColor: "#1788F0",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical:10
  },
  btnSubmitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase"
  }
});