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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = ({ navigation }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <ScrollView style={styles.mainWrapper}>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.Heading}>Cart</Text>
                <TouchableOpacity style={{ position: "absolute", right: 0 }}>
                    <MaterialIcons size={32} color="#1788F0" name="delete-outline" />
                </TouchableOpacity>
            </View>
            <View style={styles.singleCartProduct}>
                <TouchableOpacity onPress={() => setToggle(!toggle)} style={{ marginRight: 15, width: 17 }}>
                    {
                        toggle ? (
                            <View style={{ width: 15, height: 15, borderRadius: 3, borderColor: "#CECECE", borderWidth: 1, backgroundColor: "#FFF" }}></View>
                        ) : (
                            <View style={{ width: 16, position: "relative", height: 16 }}>
                                <MaterialIcons size={16} color="#3623B7" name="check-box" style={{ position: "absolute", top: 0, left: 0 }} />
                            </View>

                        )
                    }
                </TouchableOpacity>
                <Image source={require('../assets/product.png')} />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ color: "#626F7F", fontSize: 18, fontWeight: "700" }}>Product 1</Text>
                    <Text style={{ color: "#626F7F", fontSize: 13, fontWeight: "600" }}>Piece</Text>
                </View>
                <View style={{ alignItems: "center", marginLeft: "auto" }}>
                    <Text style={styles.QtyHeading}>Quantity</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{
                            width: 28,
                            height: 28,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 35,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 4.65,
                            elevation: 6,
                        }}>
                            <MaterialCommunityIcons size={16} color="#000" name="minus" />
                        </TouchableOpacity>
                        <Text style={{ paddingHorizontal: 20, fontSize: 16, color:"#000" }}>1</Text>
                        <TouchableOpacity style={{
                            width: 28,
                            height: 28,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 35,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 4.65,
                            elevation: 6,
                        }}>
                            <MaterialCommunityIcons size={16} color="#000" name="plus" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* <View style={{ paddingHorizontal: 15, paddingVertical: 8, marginTop: 25, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: "#626F7F", fontWeight: "600", fontSize: 16 }}>Subtotal</Text>
                <Text style={{ color: "#98A4B2", fontSize: 14 }}>$0.00</Text>
            </View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F3F3F3", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ color: "#626F7F", fontWeight: "600", fontSize: 16 }}>Total</Text>
                <Text style={{ color: "#98A4B2", fontSize: 14 }}>$0.00</Text>
            </View> */}
            <View style={{ alignItems: "center", marginBottom: 60 }}>
                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Check out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Cart;

var styles = StyleSheet.create({
    mainWrapper: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        backgroundColor: '#FFF',
    },
    Heading: {
        fontSize: 26,
        fontWeight: "500",
        color: "#252525",
        textAlign: "center"
    },
    singleCartProduct: {
        paddingHorizontal: 12,
        paddingVertical: 20,
        backgroundColor: "#F9F9F9",
        borderRadius: 11,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    QtyHeading: {
        color: "#626F7F",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8
    },
    btnSubmit: {
        width: "100%",
        height: 42,
        alignItems: "center",
        backgroundColor: "#1788F0",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        padding: 5
    },
    btnSubmitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: "500",
        textTransform: "uppercase"
    }
});