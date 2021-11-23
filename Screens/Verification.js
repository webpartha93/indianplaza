import React, {useState, useEffect} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

  import Icon from 'react-native-vector-icons/SimpleLineIcons';
  import OTPInputView from '@twotalltotems/react-native-otp-input'
  import {useDispatch, useSelector} from 'react-redux';
  import { doVerify } from '../Redux/Actions/VerifyActions';
  import { useIsFocused } from '@react-navigation/native';
  import Toast from 'react-native-toast-message';

  import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}) => {
    const state = useSelector(state=> state);
    const dispatch = useDispatch();  
    const isFocused = useIsFocused();
    const [otp, setOtp] = useState('');
    const [active, setActive] = useState(true);
    const [empid, setEmpid ] = useState('');
    const [empno, setEmpno] = useState('');
    const [message, setMessage] = useState('');

    useEffect(()=> {
        setEmpid(route.params.emp_id);
        setEmpno(route.params.emp_mobno);
        Toast.show({
            type: 'success',
            text1:"OTP Sent Successfully",
        });

    },[]);

    const localStorageData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('uuid', jsonValue)
        } catch (e) {
          // saving error
        }
    }

    useEffect(()=> {
        if(state.Verify.verifyData.status==="Success"){
            setOtp('');
            setMessage('');
            localStorageData(state.Verify.verifyData.data);
        }
        if(state.Verify.errorMessage.status==="Error"){
            setMessage(state.Verify.errorMessage.message);
            setActive(true);
        }
    },[state]);

    const handleSubmit = ()=> {
        dispatch(doVerify({otp, empid}));
        setOtp(''); 
        setMessage('');      
    }

    return (
        <View style={styles.mainWrapper}>
            <Toast position='bottom' bottomOffset={20} style={{backgroundColor:"#000"}} />
            <Text style={styles.Heading}>Verification</Text>
            <View style={styles.line}></View>
            <View style={styles.formWrapper}>
                <Text style={styles.formLabel}>Verify account by entering the 6-digit code sent to: XXXXXXX{empno.slice(7, 10)}</Text>
                <View style={{flexDirection:"row",marginHorizontal:"-1%"}}>
                    <OTPInputView
                        style={{width: '100%', height:55}}
                        pinCount={6}
                        code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged = {code => setOtp(code)}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.Otpbox}
                        codeInputHighlightStyle={styles.activeOtp}
                        onCodeFilled = {(code => {
                            //console.log(`Code is ${code}, you are good to go!`);
                            if(code.length == 6){
                                setActive(false);
                            }                            
                        })}
                    />                    
                </View>                              
                <TouchableOpacity disabled={active} style={[styles.btnSubmit, { opacity: active ? 0.7 : 1 }]} onPress={handleSubmit}>
                    <Text style={styles.btnSubmitText}>VERIFY</Text>
                </TouchableOpacity>
                    {
                        message !=='' && (
                            <Text style={{color:"red", textAlign:"center"}}>{message}</Text>
                        )
                    }
                <View style={{marginTop:20, justifyContent:"center", flexDirection:"row", alignItems:"center"}}>
                    <Text style={{color:'#626F7F', fontSize:15, marginRight:6}}>Didn't receive the OTP?</Text>
                    <TouchableOpacity>
                        <Text style={{color:"#1788F0", fontSize:15, fontWeight:"700"}}>RESEND OTP</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:20,alignItems:"center"}}>
                    <Text style={{color:'#060395', fontSize:15, marginRight:6}}>Code expires in 04:59 minutes</Text>
                </View>
            </View>
        </View>
    )
}

export default Verification;

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
        lineHeight:24,
        marginBottom:20
    },
    inputWrapper:{
        width:"22.66%",
        backgroundColor:"#F2F1F8",
        borderRadius:14,
        marginHorizontal:"1%"
    },
    btnSubmit:{
        width:"100%",
        backgroundColor:"#1788F0",
        borderRadius:30,
        flexDirection:"row",
        justifyContent:"center",
        padding:14,
        marginTop:30,
        marginBottom:8
    },
    btnSubmitText:{
        color:'#FFF',
        fontSize:16,
        fontWeight:"500",
        textTransform:"uppercase"
    },
    Otpbox:{
        backgroundColor:"#F2F1F8",
        borderRadius:14,
        color:"#000",
        fontSize:17,
        fontWeight:"700"
    },
    activeOtp:{
        borderColor:"#1788F0"
    }
});
