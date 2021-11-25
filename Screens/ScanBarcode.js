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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { afterScanProduct } from '../Redux/Actions/AllActions';

import Toast from 'react-native-toast-message';

const ScanBarcode = ({navigation, route}) => {
    const state = useSelector(state=> state.AllReducers.allScanProducts);
    const dispatch = useDispatch();
    const [singleBarcode, setSingleBarcode] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [productId, setProductId] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const isFocused = useIsFocused();
    console.log('scanbarcode', route.params);

    useEffect(()=> {
        if(route.params.barcode!==undefined){
            setSingleBarcode(route.params.barcode);
        }        
    },[isFocused]);

    useEffect(()=> {
        if(singleBarcode!==''){
            dispatch(afterScanProduct(singleBarcode));
        }      
    }, [singleBarcode]);

    useEffect(()=> {
        if(state.data!==undefined){
            setTotalItems(state.data.length);
            setAllProducts(state.data);
            setProductId(state.data[0]?.item_id);
            if(state.data.length === 0){
                Toast.show({
                    type: 'success',
                    text1:"No Products Found. Scan again please",
                });
            }
        } 
        
    }, [state]);

    useEffect(()=> {
        setTotalItems(0);
    }, []);


    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Scan Barcode</Text>
            <View style={styles.line}></View>
            <Toast position='top' style={{backgroundColor:"#000"}} />
            <TouchableOpacity style={{
                backgroundColor:"#F2F1F8",
                borderWidth:1,
                borderColor:"#E9E9E9",
                borderRadius:18,
                alignItems:"center",
                marginTop:30,
                position:"relative",
                overflow:"hidden",
                padding:30
            }}
            onPress={()=> navigation.navigate('barcodecamera', {
                deliverDate:route.params.deliverDate,
                deliveryNumber:route.params.deliveryNumber,
                org_id:route.params.org_id,
                vendor_id:route.params.vendor_id,
                activity:route.params.activity
            })}
            >
                <Image source={require('../assets/barcode.png')} /> 
            </TouchableOpacity>            
            <View style={{alignItems:"center"}}>                
                {/* <TouchableOpacity disabled={singleBarcode!=='' ? false : true} 
                style={[styles.btnSubmit, {opacity:singleBarcode!=='' ? 1 : 0.7}]} 
                onPress={()=> totalItems > 1 ? navigation.navigate('ProductList', {
                    allProducts:allProducts,
                    deliverDate:route.params.deliverDate,
                    deliveryNumber:route.params.deliveryNumber,
                    org_id:route.params.org_id,
                    vendor_id:route.params.vendor_id,
                    activity:route.params.activity
                }) : navigation.navigate('UnitMeasure',{
                    productId:productId,
                    deliverDate:route.params.deliverDate,
                    deliveryNumber:route.params.deliveryNumber,
                    org_id:route.params.org_id,
                    vendor_id:route.params.vendor_id,
                    activity:route.params.activity
                })}
                >
                    <Text style={{color:"#FFF", fontSize:18}}>NEXT</Text>                  
                </TouchableOpacity> */}

                <TouchableOpacity disabled={totalItems > 0 ? false : true} 
                style={[styles.btnSubmit, {opacity:totalItems > 0 ? 1 : 0.7}]} 
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
                    <Text style={{color:"#FFF", fontSize:18}}>NEXT</Text>                  
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScanBarcode;

var styles = StyleSheet.create({
    mainWrapper:{
        flex:1,
        paddingHorizontal:30,
        paddingVertical:40,
        backgroundColor:'#FFF'
    },
    Heading:{
        fontSize:26,
        fontWeight:"500",
        color:"#252525"
    },
    line:{
        width:34,
        height:4,
        backgroundColor:"#1788F0",
        borderRadius:3,
        marginTop:10
    },
    formWrapper:{
        paddingVertical:30
    },
    formLabel:{
        fontSize:15,
        fontWeight:"500",
        color:'#626F7F',
        marginBottom:10
    },
    inputWrapper:{
        width:"100%",
        backgroundColor:"#F2F1F8",
        borderRadius:30,
        paddingRight:15,
        paddingLeft:35
    },
    btnSubmit:{
        backgroundColor:"#1788F0",
        borderRadius:30,
        flexDirection:"row",
        justifyContent:"center",
        marginTop:30,
        paddingHorizontal:18,
        paddingVertical:8
    },
    btnSubmitText:{
        color:'#FFF',
        fontSize:16,
        fontWeight:"500",
        textTransform:"uppercase"
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
