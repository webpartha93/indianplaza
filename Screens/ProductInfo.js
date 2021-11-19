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
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductInfo= ({navigation, route}) => {
    console.log(route.params);
    const [value, setValue] = useState('');

    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Product Info</Text>
            <View style={styles.line}></View>
            <View style={{borderRadius:10, overflow:"hidden", marginTop:30, backgroundColor:"#F9F9F9"}}>
                <View style={styles.Label}>
                    <Text style={{color:"#626F7F", fontSize:15, fontWeight:"700"}}>Product Code</Text>
                </View>
                <View style={styles.Desc}>
                    <Text style={{color:"#626F7F", fontSize:13}}>BAC-12345-ajgh</Text>
                </View>
                <View style={styles.Label}>
                    <Text style={{color:"#626F7F", fontSize:15, fontWeight:"700"}}>Description</Text>
                </View>
                <View style={styles.Desc}>
                    <Text style={{color:"#626F7F", fontSize:13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </View>
            </View>

            <View style={{alignItems:"center", marginTop:30}}>
                <Text style={styles.QtyHeading}>Quantity</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <TouchableOpacity style={{
                        width:35,
                        height:35,
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:"#FFF",
                        borderRadius:35,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.12,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <MaterialCommunityIcons size={20} name="minus" />
                    </TouchableOpacity>
                    <Text style={{paddingHorizontal:20, fontSize:20}}>0</Text>
                    <TouchableOpacity style={{
                        width:35,
                        height:35,
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:"#FFF",
                        borderRadius:35,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.12,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <MaterialCommunityIcons size={20} name="plus" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('ProductList')}>
                    <Text style={{color:"#FFF", fontSize:18}}>PREV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('Scanbarcode')}>
                    <MaterialCommunityIcons size={30} color="#FFF" name="barcode-scan" />                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('UnitMeasure')}>
                    <Text style={{color:"#FFF", fontSize:18}}>NEXT</Text>                 
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductInfo;

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
    Label:{
        backgroundColor:"#F2F1F8",
        paddingHorizontal:14,
        paddingVertical:10
    },
    Desc:{        
        paddingHorizontal:14,
        paddingVertical:12
    },
    QtyHeading:{
        color:"#626F7F",
        fontSize:15,
        fontWeight:"600",
        marginBottom:15
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
