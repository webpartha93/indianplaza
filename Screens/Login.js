import React, {useState, useEffect} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator
  } from 'react-native';

  import Icon from 'react-native-vector-icons/SimpleLineIcons';
  import {useDispatch, useSelector} from 'react-redux';
import { doLogin } from '../Redux/Actions/AuthActions';
import { useIsFocused } from '@react-navigation/native';



const Login = ({navigation }) => {
    const state = useSelector(state=> state);
    const dispatch = useDispatch();  
    const isFocused = useIsFocused();
    const [inputval, setInputVal] = useState('');
    const [isbuttonactive, setIsbuttonactive] = useState(true);
    const [loading, setIsloading] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleChange = (e)=> {
        setInputVal(e.nativeEvent.text);
        if(e.nativeEvent.text.length > 5){
            setIsbuttonactive(false);
        }else{
            setIsbuttonactive(true);
        }
    }
    

    const handleSubmit = ()=> {        
        dispatch(doLogin(inputval));
    }
   

    useEffect(()=> {
        if(state.Login.loginData.status==="Success"){
            let dataId = state.Login.loginData.data.emp_id;
            let mobileNo = state.Login.loginData.data.emp_mobno;
            navigation.navigate('verification', {
                emp_id:dataId,
                emp_mobno:mobileNo
            });
            setInputVal('');
            state.Login.loginData.status="";            
        }
        if(state.Login.errorMessage.status==="Error"){
            setMessage(state.Login.errorMessage.message);
        }
        console.log(state.Login);
        setIsloading(state.Login.isLoggedIn);
    }, [state]);
    

    useEffect(()=> {
        setMessage('');
        setIsloading(false);
        setIsbuttonactive(true);
    },[isFocused]);

    if(loading){
        return <View style={{flex:1, justifyContent:'center', alignItems:"center", backgroundColor:"#FFF"}}><ActivityIndicator size="large" color="#7b0b0d" /></View>
    }

    return (
        <View style={styles.mainWrapper}>            
            <Text style={styles.Heading}>Sign In</Text>
            <View style={styles.line}></View>
            <View style={styles.formWrapper}>
                <Text style={styles.formLabel}>Your Access code</Text>
                <View style={styles.inputWrapper}>
                    <Icon size={16} color="#626F7F" name="key" style={{position:"absolute", left:15, top:16}} />
                    <TextInput 
                        keyboardType="number-pad"
                        maxLength={12} 
                        value={inputval} 
                        onChange={handleChange} 
                        style={{width:"100%", color:"#000"}}/>                    
                </View>
                {
                    message !=='' && (
                        <Text style={{color:"red"}}>{message}</Text>
                    )
                }
                <TouchableOpacity disabled={isbuttonactive} onPress={handleSubmit} style={[styles.btnSubmit, { opacity: isbuttonactive ? 0.7 : 1 }]}>
                    <Text style={styles.btnSubmitText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;

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
        width:"100%",
        backgroundColor:"#1788F0",
        borderRadius:30,
        flexDirection:"row",
        justifyContent:"center",
        padding:14,
        marginTop:30
    },
    btnSubmitText:{
        color:'#FFF',
        fontSize:16,
        fontWeight:"500",
        textTransform:"uppercase"
    }
});