import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
  } from 'react-native';


const UnitMeasure = ({navigation}) => {
    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Unit of Measure</Text>
            <View style={styles.line}></View>
            <View style={{marginTop:40}}>
                <View style={{flexDirection:"row", marginHorizontal:-10}}>
                    <View style={styles.btnBox}>
                        <TouchableOpacity style={{
                            borderRadius:10,
                            backgroundColor:"#3623B7",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            height:140,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                                },
                                shadowOpacity: 0.12,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }}>
                            <View style={{width:60, height:60, backgroundColor:"rgba(23,136,240,0.46)", borderRadius:16, flexDirection:"column", justifyContent:"center", alignItems:"center", marginBottom:16}}>
                                <Image source={require('../assets/pieces.png')}/>
                            </View>
                            <Text style={{fontSize:15, fontWeight:"600", color:"#FFFFFF"}}>Piece</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnBox}>
                        <TouchableOpacity style={{
                            borderRadius:10, 
                            backgroundColor:"#FFF",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            height:140,
                            shadowColor: "#000",
                            shadowOffset: {
                            width: 0,
                            height: 3,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 4.65,
                            elevation: 6,
                        }}>
                            <View style={{width:60, height:60, backgroundColor:"rgba(23,136,240,0.15)", borderRadius:16, flexDirection:"column", justifyContent:"center", alignItems:"center", marginBottom:16}}>
                                <Image source={require('../assets/carton.png')}/>
                            </View>
                            <Text style={{fontSize:15, fontWeight:"600", color:"#626F7F"}}>Carton</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{alignItems:"center", marginTop:20}}>
                <TouchableOpacity style={styles.btnSubmit} onPress={()=> navigation.navigate('')}>
                    <Text style={{color:"#FFF", fontSize:18}}>NEXT</Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UnitMeasure;

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
    btnBox:{
        width:"50%",
        paddingHorizontal:10,
        marginBottom:20
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