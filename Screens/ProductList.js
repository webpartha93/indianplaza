import React,{useState} from 'react'
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

const ProductList = ({navigation, route}) => {
    console.log(route.params.allProducts);
    const [value, setValue] = useState('');
    var radio_props = route.params.allProducts

    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Select Item</Text>
            <View style={styles.line}></View>
            <RadioForm
                radio_props={radio_props}
                initial={0}
                buttonColor={'#060395'}
                labelColor={'#626F7F'}
                buttonSize={15}
                labelStyle={{fontSize:16, color: '#626F7F', marginBottom:12}}
                onPress={(value) => {setValue({value:value})}}
                style={{marginBottom:30, marginTop:30}}
            />
            <View style={{alignItems:"center"}}>
                <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('ProductInfo')}>
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
