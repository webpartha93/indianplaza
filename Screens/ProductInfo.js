import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getProductInfo, assignBarCode } from '../Redux/Actions/AllActions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToCartUnknown } from '../Redux/Actions/cartAction';
import { doCheckout } from '../Redux/Actions/CheckoutAction';

import ImagePicker from 'react-native-image-crop-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = ({ navigation, route }) => {

    const state = useSelector(state => state.AllReducers.productDetails);
    const statecart = useSelector(state => state.CartReducer);
    const statecheckout = useSelector(state => state.CheckOutReducers);

    const [product_qty, setProduct_qty] = useState(1);
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [isUnknownItem, setIsUnknownItem] = useState('');
    const [remarks, setRemarks] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [uploadedImage, setUploadedImage] = useState([]);

    const [empId, setEmpId] = useState('');
    const product_id = route.params.productId;
    const product_uom = route.params.product_uom;
    const activity = route.params.activity;
    // const additional_barcode = route.params.additional_barcode !== undefined ? route.params.additional_barcode : "";
    const getAllData = route.params;
    console.log('productUom', route.params.product_uom);

    console.log('additional_barcode', route.params);

    const readItemFromStorage = async () => {
        try {
            const loggedInUser = await AsyncStorage.getItem("uuid");
            const parseVal = JSON.parse(loggedInUser);
            if (loggedInUser !== null) {
                return parseVal.emp_id;
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    const handleIncrement = () => {
        setProduct_qty(prevVal => prevVal + 1);
    }
    const handleDecrement = () => {
        setProduct_qty(prevVal => prevVal - 1);
    }

    const handleNumberChange = (e) => {
        var numberVal = Number(e);
        console.log(numberVal);
        if (e < 1) {
            setProduct_qty('');
            setIsButtonDisabled(true);
        } else {
            setProduct_qty(numberVal);
            setIsButtonDisabled(false);
        }

    }

    const handleRemarks = (val) => {
        setRemarks(val);
        if (val.length >= 1) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
        // console.log(val.length);

    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductInfo(route.params.productId));
        readItemFromStorage().then((value) => setEmpId(value));
        setIsUnknownItem(route.params.isUnknownItem);

        dispatch(assignBarCode({
            barcode: route.params.additional_barcode,
            product_id: route.params.productId
        }));
    }, [])

    useEffect(() => {
        if (state.data !== undefined) {
            setProductName(state.data.item_code);
            setProductDesc(state.data.item_description);
        }
    }, [state])


    const handleAddToCart = () => {
        dispatch(addToCart({
            productData: {
                productName,
                product_qty,
                product_id,
                product_uom,
                activity
                // additional_barcode
            },
            getAllData,
            remarks
        }))
    }

    const handleAddToCart2 = () => {
        dispatch(addToCartUnknown({
            productData: {
                productName,
                product_qty,
                product_id,
                product_uom,
                activity,
                // additional_barcode,
                remarks
            },
            getAllData,
            remarks
        }))
    }

    const doCheckOut = () => {
        const updatedCartItem = statecart.cartItems.map(({ productName, activity, ...rest }) => ({ ...rest }));
        //console.log('result', getAllData);
        dispatch(doCheckout({
            getAllData,
            updatedCartItem,
            empId,
            remarks
        }));
        dispatch({ type: "RESET_ADDED_CART" });
    }

    useEffect(() => {
        console.log('catddd', statecart.isAddedCartItem);
        if (statecart.isAddedCartItem) {
            doCheckOut();
        }
        //
    }, [statecart])


    useEffect(() => {
        console.log('checkoutreducer', statecheckout.checkoutSuccessMessage.data);
        if (statecheckout.checkoutSuccessMessage.data !== undefined) {
            shipmentNumberAlert(statecheckout.checkoutSuccessMessage.data);
        }
        //
    }, [statecheckout])


    const showAlert = () =>
        Alert.alert(
            "Do you really want to submit?",
            "",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => handleAddToCart() }
            ]
        );

    const showAlert2 = () =>
        Alert.alert(
            "Do you really want to submit?",
            "",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => handleAddToCart2() }
            ]
        );

    const shipmentNumberAlert = (number) =>
        Alert.alert(
            `Your Shipment Number is ${number}`,
            "",
            [
                {
                    text: "Ok", onPress: () => {
                        navigation.navigate('activity', {
                            org_id: route.params.org_id,
                        })
                        dispatch({ type: "REMOVE_CHECKOUT_DATA" })
                        dispatch({ type: "RESET_SCAN_DATA" })
                    }
                }
            ]
        );

    const handleTakePhoto = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            multiple: true,
            compressImageQuality: 0.6,
            includeBase64: true
        }).then(image => {
            console.log(image);
            setUploadedImage([...uploadedImage, image.path]);
        });
    }

    const handleCross = (elem) => {
        console.log('AD', elem);
        let removeItem = uploadedImage.filter((item, index) => {
            return index !== elem
        });
        setUploadedImage(removeItem);
    }

    useEffect(() => {

        if (uploadedImage.length == 1) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }

    }, [uploadedImage])

    return (
        <View style={styles.mainWrapper}>
            <View style={{ position: "relative" }}>
                <Text style={styles.Heading}>Product Info</Text>
                <View style={styles.line}></View>
            </View>
            <ScrollView>
                <View style={{ borderRadius: 10, overflow: "hidden", marginTop: 30, backgroundColor: "#F9F9F9" }}>
                    <View style={styles.Label}>
                        <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Product Code</Text>
                    </View>
                    <View style={styles.Desc}>
                        <Text style={{ color: "#626F7F", fontSize: 13 }}>{productName}</Text>
                    </View>
                    <View style={styles.Label}>
                        <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Description</Text>
                    </View>
                    <View style={styles.Desc}>
                        <Text style={{ color: "#626F7F", fontSize: 13 }}>{productDesc}</Text>
                    </View>
                    <View style={styles.Label}>
                        <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Unit of Measure</Text>
                    </View>
                    <View style={styles.Desc}>
                        <Text style={{ color: "#626F7F", fontSize: 13 }}>{product_uom > 3 ? "Carton" : "Piece"}</Text>
                    </View>

                    {
                        route.params.isUnknownItem === "true" && (
                            <>
                                {/* <View style={styles.Label}>
                                    <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Remarks</Text>
                                </View>
                                <View style={styles.Desc}>
                                    <View style={styles.inputWrapper}>
                                        <AntDesign size={16} color="#626F7F" name="edit" style={{ position: "absolute", left: 15, top: 16 }} />
                                        <TextInput
                                            editable
                                            multiline
                                            numberOfLines={5}
                                            textAlignVertical='top'
                                            style={{ paddingTop: 10, color: "#000", width: "100%" }}
                                            autoCapitalize="characters"
                                            placeholderTextColor="#a1a1a1"
                                            value={remarks}
                                            onChangeText={handleRemarks}
                                        />
                                    </View>
                                </View> */}

                                <View style={styles.Label}>
                                    <Text style={{ color: "#626F7F", fontSize: 15, fontWeight: "700" }}>Image <Text style={{ fontSize: 12, fontWeight: "400" }}>Please upload images (max 2)</Text></Text>
                                </View>
                                <View style={styles.Desc}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        {
                                            uploadedImage.map((item, index) => {
                                                return (
                                                    <View key={index} style={{ position: "relative" }}>
                                                        <Image source={{ uri: item }} style={{ width: 100, height: 100, borderRadius: 10, marginHorizontal: 10, marginBottom: 25 }} resizeMode="cover" />
                                                        <TouchableOpacity onPress={() => handleCross(index)} style={{ position: "absolute", right: 0, top: 0, zIndex: 99, backgroundColor: "#FFF", borderRadius: 40, overflow: "hidden" }}><MaterialCommunityIcons size={25} color="red" name="close-circle" /></TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        {
                                            uploadedImage.length != 2 && (
                                                <TouchableOpacity onPress={handleTakePhoto} style={[styles.btnSubmit, { width: 150, marginTop: 0 }]}>
                                                    <Text style={{ color: "#FFF", fontSize: 16 }}>Take a photo</Text>
                                                </TouchableOpacity>
                                            )
                                        }

                                    </View>
                                </View>
                            </>
                        )
                    }


                </View>

                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <Text style={styles.QtyHeading}>Quantity</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity disabled={product_qty > 1 ? false : true} onPress={handleDecrement} style={{
                            width: 35,
                            height: 35,
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
                            <MaterialCommunityIcons size={20} color="#000" name="minus" />
                        </TouchableOpacity>
                        {/* <Text style={{ paddingHorizontal: 20, fontSize: 20, color: "#000" }}>{product_qty}</Text> */}
                        <TextInput keyboardType='numeric' defaultValue={product_qty.toString()} value={product_qty.toString()} onChangeText={(e) => handleNumberChange(e)} style={{ paddingHorizontal: 20, fontSize: 20, color: "#000" }} />
                        <TouchableOpacity onPress={handleIncrement} style={{
                            width: 35,
                            height: 35,
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
                            <MaterialCommunityIcons size={20} color="#000" name="plus" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    {
                        route.params.norlamFlow === "true" ? (
                            <TouchableOpacity style={styles.btnSubmit} onPress={() => {
                                navigation.navigate('Scanbarcode', {
                                    deliverDate: route.params.deliverDate,
                                    deliveryNumber: route.params.deliveryNumber,
                                    org_id: route.params.org_id,
                                    vendor_id: route.params.vendor_id,
                                    activity: route.params.activity,
                                })
                                dispatch({ type: "RESET_SCAN_DATA" })
                            }}>
                                <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.goBack()}>
                                <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                            </TouchableOpacity>
                        )

                    }

                    {
                        route.params.isUnknownItem === "true" ? (
                            <>
                                <TouchableOpacity disabled={btnDisabled} style={[styles.btnSubmit, { backgroundColor: btnDisabled ? "#9d9d9d" : "#1788F0" }]} onPress={() => {
                                    navigation.navigate('Scanbarcode', {
                                        deliverDate: route.params.deliverDate,
                                        deliveryNumber: route.params.deliveryNumber,
                                        org_id: route.params.org_id,
                                        vendor_id: route.params.vendor_id,
                                        activity: activity,
                                        barcode: '',
                                        additional_barcode: ''
                                    })
                                    dispatch(addToCartUnknown({
                                        productData: {
                                            productName,
                                            product_qty,
                                            product_id,
                                            product_uom,
                                            activity,
                                            // additional_barcode,
                                            remarks
                                        },
                                        getAllData,
                                        remarks
                                    }))
                                    dispatch({ type: "RESET_ADDED_CART" })
                                    dispatch({ type: "RESET_SCAN_DATA" })
                                }}>
                                    <MaterialCommunityIcons size={30} color="#FFF" name="barcode-scan" />
                                </TouchableOpacity>
                            </>

                        ) : (
                            <>
                                <TouchableOpacity disabled={isButtonDisabled} style={[styles.btnSubmit, { backgroundColor: isButtonDisabled ? "#9d9d9d" : "#1788F0" }]} onPress={() => {
                                    navigation.navigate('Scanbarcode', {
                                        deliverDate: route.params.deliverDate,
                                        deliveryNumber: route.params.deliveryNumber,
                                        org_id: route.params.org_id,
                                        vendor_id: route.params.vendor_id,
                                        activity: activity,
                                        barcode: '',
                                        additional_barcode: ''
                                    })
                                    dispatch(addToCart({
                                        productData: {
                                            productName,
                                            product_qty,
                                            product_id,
                                            product_uom,
                                            activity,
                                            // additional_barcode
                                        },
                                        getAllData
                                    }))
                                    dispatch({ type: "RESET_ADDED_CART" })
                                    dispatch({ type: "RESET_SCAN_DATA" })
                                }}>
                                    <MaterialCommunityIcons size={30} color="#FFF" name="barcode-scan" />
                                </TouchableOpacity>
                            </>
                        )

                    }

                </View>

                <View style={{ marginTop: 20, width: "100%", maxWidth: 150, marginHorizontal: "25%" }}>
                    {
                        route.params.isUnknownItem === "true" ? (
                            <TouchableOpacity disabled={btnDisabled} style={[styles.btnSubmit, { backgroundColor: btnDisabled ? "#9d9d9d" : "#1788F0" }]} onPress={showAlert2}>
                                <Text style={{ color: "#FFF", fontSize: 18 }}>DONE</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity disabled={isButtonDisabled} style={[styles.btnSubmit, { backgroundColor: isButtonDisabled ? "#9d9d9d" : "#1788F0" }]} onPress={showAlert}>
                                <Text style={{ color: "#FFF", fontSize: 18 }}>DONE</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ProductInfo;

var styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
        paddingBottom: 10,
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
    inputWrapper: {
        width: "100%",
        backgroundColor: "#F2F1F8",
        borderRadius: 30,
        paddingRight: 15,
        paddingLeft: 35,
        flexDirection: "row",
        alignItems: "center"
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
