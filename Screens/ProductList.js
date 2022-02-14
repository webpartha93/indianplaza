import React,{useState, useEffect} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

  import { assignBarCode } from '../Redux/Actions/AllActions';
  import { useDispatch } from 'react-redux';

const ProductList = ({navigation, route}) => {    
    const [value, setValue] = useState([]);
    const [selectedVal, setSelectedVal] = useState();    
    useEffect(()=> {
        const radio_props = route.params?.allProducts.map(item => {
            return { label: item.item_description, value: item.item_id };
        });
        setValue(radio_props);
        setSelectedVal(radio_props[0].value);
    },[]);
    console.log('allparams',route.params);

    const dispatch = useDispatch();

    // var radio_props = route.params.allProducts

    return (
        <View style={styles.mainWrapper}>
            <View style={{position:"relative"}}>
            <Text style={styles.Heading}>Select Item</Text>
            <View style={styles.line}></View>
            </View>
            <RadioForm
                radio_props={value}
                initial={selectedVal}
                buttonColor={'#060395'}
                labelColor={'#626F7F'}
                buttonSize={15}
                labelStyle={{fontSize:16, color: '#626F7F', marginBottom:12}}
                onPress={(value) => {setSelectedVal(value)}}
                style={{marginBottom:30, marginTop:30}}
            />
            <View style={{alignItems:"center"}}>
                <TouchableOpacity style={styles.btnSubmit} 
                onPress={()=> {navigation.navigate('ProductInfo', {
                    barcode:route.params.barcode,
                    productId:selectedVal,
                    dataLength:route.params.dataLength,
                    deliverDate:route.params.deliverDate,
                    deliveryNumber:route.params.deliveryNumber,
                    org_id:route.params.org_id,
                    vendor_id:route.params.vendor_id,
                    activity:route.params.activity,
                    additional_barcode:route.params.additional_barcode,
                    product_uom: 7
                });
                dispatch({ type:"RESET_SCAN_DATA"});
                dispatch(assignBarCode({
                    barcode: route.params.additional_barcode,
                    product_id: route.params.productId
                }));
            }
                
            }>
                    <Text style={{color:"#FFF", fontSize:18}}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductList;

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
    }
});
