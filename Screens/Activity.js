import React, { useState } from 'react'
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

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Activity = ({ navigation, route }) => {
    const allActivityCategory = [
        {
            "catName": "Receive",
            "id": "0"
        },
        {
            "catName": "Return",
            "id": "1"
        },
        {
            "catName": "Shelve",
            "id": "2"
        }
    ]
    const [id, setId] = useState();

    const handleClick = (e) => {
        setId(e);
        navigation.navigate('Supplier', {
            org_id:route.params.org_id
        });
    }


    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Activity</Text>
            <View style={styles.line}></View>


            <View style={{ marginTop: 40 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -10 }}>
                    {
                        allActivityCategory.map((item, index) => {
                            if (index > 1) {
                                return (
                                    <View key={index} style={{ width: "100%", paddingHorizontal: 10 }}>
                                        <TouchableOpacity onPress={() => handleClick(index)} style={{
                                            borderRadius: 10,
                                            backgroundColor: item.id == id ? "#3623B7" : "#FFF",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            shadowColor: "#000",
                                            padding: 18,
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 4.65,
                                            elevation: 6,
                                        }}>
                                            <View style={{ width: 60, height: 60, backgroundColor: item.id == id ? "rgba(23,136,240,0.46)" : "rgba(23,136,240,0.15)", borderRadius: 16, flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: 15 }}>
                                                {
                                                    item.id == id ? (<Image source={require('../assets/icon3-hover.png')} />) : (<Image source={require('../assets/icon3.png')} />)
                                                }
                                            </View>
                                            <Text style={{ fontSize: 15, fontWeight: "600", color: item.id == id ? "#FFF" : "#626F7F" }}>{item.catName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            } else {
                                return (
                                    <>
                                        {
                                            index == 0 ? (
                                                <View key={index} style={styles.btnBox}>
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
                                                        <View style={{ width: 60, height: 60, backgroundColor: item.id == id ? "rgba(23,136,240,0.46)" : "rgba(23,136,240,0.15)", borderRadius: 16, flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom:15 }}>
                                                            {
                                                                item.id == id ? (<Image source={require('../assets/icon1-hover.png')} />) : (<Image source={require('../assets/icon1.png')} />)
                                                            }
                                                        </View>
                                                        <Text style={{ fontSize: 15, fontWeight: "600", color: item.id == id ? "#FFF" : "#626F7F" }}>{item.catName}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (
                                                <View key={index} style={styles.btnBox}>
                                                    <TouchableOpacity onPress={() => handleClick(index)} style={{
                                                        borderRadius: 10,
                                                        backgroundColor: item.id == id ? "#3623B7" : "#FFF",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: 140,
                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 3,
                                                        },
                                                        shadowOpacity: 0.12,
                                                        shadowRadius: 4.65,
                                                        elevation: 6,
                                                    }}>
                                                        <View style={{ width: 60, height: 60, backgroundColor: item.id == id ? "rgba(23,136,240,0.46)" : "rgba(23,136,240,0.15)", borderRadius: 16, flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom:15 }}>
                                                            {
                                                                item.id == id ? (<Image source={require('../assets/icon2-hover.png')} />) : (<Image source={require('../assets/icon2.png')} />)
                                                            }
                                                        </View>
                                                        <Text style={{ fontSize: 15, fontWeight: "600", color: item.id == id ? "#FFF" : "#626F7F" }}>{item.catName}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }

                                    </>
                                )
                            }

                        })
                    }
                </View>
            </View>



            <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('Branch')}>
                    <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Activity;

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