import React, { useState } from 'react';
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


const UnitMeasure = ({ navigation, route }) => {

    const unitsCategory = [
        {
            "catName": "Piece",
            "id": "0"
        },
        {
            "catName": "Carton",
            "id": "1"
        }
    ]

    const [id, setId] = useState();

    const handleClick = (e) => {
        setId(e);
        navigation.navigate('ProductInfo', {
            productId: route.params.productId,
            deliverDate: route.params.deliverDate,
            deliveryNumber: route.params.deliveryNumber
        });
    }

    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Unit of Measure</Text>
            <View style={styles.line}></View>
            <View style={{ marginTop: 40 }}>
                <View style={{ flexDirection: "row", marginHorizontal: -10 }}>
                    {
                        unitsCategory.map((item, index) => {
                            return (
                                <View style={styles.btnBox} key={index}>
                                    <TouchableOpacity onPress={() => handleClick(index)} style={{
                                        borderRadius: 10,
                                        backgroundColor: item.id == id ? "#3623B7" : "#FFF",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 140,
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.12,
                                        shadowRadius: 4.65,
                                        elevation: 6,
                                    }}>
                                        {/* <View style={{width:60, height:60, backgroundColor:"rgba(23,136,240,0.46)", borderRadius:16, flexDirection:"column", justifyContent:"center", alignItems:"center", marginBottom:16}}>
                                <Image source={require('../assets/pieces.png')}/>
                            </View> */}

                                        <View style={{ width: 60, height: 60, backgroundColor: item.id == id ? "rgba(23,136,240,0.46)" : "rgba(23,136,240,0.15)", borderRadius: 16, flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                                            {
                                                index == 0 ? (
                                                    item.id == id ? (<Image source={require('../assets/pieces.png')} />) : (<Image source={require('../assets/pieces-hover.png')} />)
                                                ) : (
                                                    item.id == id ? (<Image source={require('../assets/carton-hover.png')} />) : (<Image source={require('../assets/carton.png')} />)
                                                )
                                            }

                                        </View>

                                        <Text style={{ fontSize: 15, fontWeight: "600", color: item.id == id ? "#FFF" : "#626F7F" }}>{item.catName}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })

                    }

                </View>
            </View>
            {/* <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('ProductInfo')}>
                    <Text style={{ color: "#FFF", fontSize: 18 }}>NEXT</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

export default UnitMeasure;

var styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
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
    btnBox: {
        width: "50%",
        paddingHorizontal: 10,
        marginBottom: 20
    },
    btnSubmit: {
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