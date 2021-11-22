import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    LogBox,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const DeliveryInfo = ({ navigation }) => {
    const [formData, setFormData] = useState({
        deliveryNumber: '',
        remarks: ''
    });

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        //console.log("selected", currentDate);        
        setDate(currentDate);
        if(selectedDate){
            var strDate = selectedDate.toISOString().substring(0, 10);
            setSelectedDate(strDate);
        }
      };    
      
      const showDatepicker = ()=> {
        setShow(true);
      }

      useEffect(()=> {
        if(formData.deliveryNumber !=="" && selectedDate !== ""){
            setBtnDisabled(false);
        }else{
            setBtnDisabled(true);
        }
      }, [formData, selectedDate]);

    return (
        <ScrollView style={styles.mainWrapper}>
            <Text style={styles.Heading}>Delivery Info</Text>
            <View style={styles.line}></View>
            <View style={styles.formWrapper}>
                <Text style={styles.formLabel}>Delivery Note Number</Text>
                <View style={styles.inputWrapper}>
                    <Icon size={16} color="#626F7F" name="file-text" style={{ position: "absolute", left: 15, top: 16 }} />
                    <TextInput
                        value={formData.deliveryNumber}
                        placeholderTextColor="#a1a1a1"
                        placeholder="123 456 789 963"
                        style={{ width: "100%", color: "#000" }}
                        onChangeText={(val) => setFormData(values => ({ ...values, deliveryNumber: val }))}
                    />
                </View>

                <Text style={[styles.formLabel, { marginTop: 15 }]}>Delivery Date</Text>
                <TouchableOpacity  style={[styles.inputWrapper,{height:45}]} onPress={showDatepicker}>
                    <Icon size={16} color="#626F7F" name="calendar" style={{ position: "absolute", left: 15, top: 16 }} />
                    <Text style={{color:"#000"}}>{selectedDate!=="" ? selectedDate : 'Select Date'}</Text>
                    {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                        style={{backgroundColor:"#1788F0"}}
                    />
                    )}

                </TouchableOpacity>

                <Text style={[styles.formLabel, { marginTop: 15 }]}>Remarks</Text>
                <View style={styles.inputWrapper}>
                    <AntDesign size={16} color="#626F7F" name="edit" style={{ position: "absolute", left: 15, top: 16 }} />
                    <TextInput
                        placeholder="Lorem ipsum dolor sit amet."
                        editable
                        multiline
                        numberOfLines={5}
                        textAlignVertical='top'
                        style={{ paddingTop: 10, color: "#000" }}
                        placeholderTextColor="#a1a1a1"
                        value={formData.remarks}
                        onChangeText={(val) => setFormData(values => ({ ...values, remarks: val }))}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('Supplier')}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>PREV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={btnDisabled} style={[styles.btnSubmit, {opacity:btnDisabled ? 0.7 : 1}]} onPress={() => navigation.navigate('Scanbarcode', {
                        deliverDate: selectedDate,
                        deliveryNumber:formData.deliveryNumber
                    })}>
                        <Text style={{ color: "#FFF", fontSize: 18 }}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default DeliveryInfo;

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
    formWrapper: {
        paddingVertical: 30
    },
    formLabel: {
        fontSize: 15,
        fontWeight: "500",
        color: '#626F7F',
        marginBottom: 10
    },
    inputWrapper: {
        width: "100%",
        backgroundColor: "#F2F1F8",
        borderRadius: 30,
        paddingRight: 15,
        paddingLeft: 35,
        flexDirection:"row",
        alignItems:"center"
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
