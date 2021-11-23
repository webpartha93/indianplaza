import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

import {Picker} from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useDispatch, useSelector} from 'react-redux';
import { allBranch } from '../Redux/Actions/AllActions';
import { doLogout } from '../Redux/Actions/VerifyActions';


import AsyncStorage from '@react-native-async-storage/async-storage';


const Branch = ({navigation}) => {
    const [empId, setEmpId] = useState('');
    const state = useSelector(state=> state.AllReducers);
    const dispatch = useDispatch();

    const [selectedVal, setSelectedVal] = useState('');

    const [fetchBranch, setFetchBranch] = useState([]);

    const readItemFromStorage = async () => {
        try {
          const loggedInUser = await AsyncStorage.getItem("uuid");
          const parseVal = JSON.parse(loggedInUser);
          if (loggedInUser !== null) {        
            setEmpId(parseVal);
          }else{
            setEmpId("");
          }
        } catch (e) {
          alert('Failed to fetch the data from storage')
        }
      }


    useEffect(() => {
        readItemFromStorage();        
    }, []);

    useEffect(() => {
        if(empId!==''){
            dispatch(allBranch(empId.emp_id));
        }        
    }, [empId]);

    useEffect(() => {
        if(state.allBranch.data!==undefined){
            setFetchBranch(state.allBranch.data);
        }        
    }, [state]);

    const branchItems = ()=> {
        return (
            fetchBranch.map( (item, index) => {               
                return(
                    <Picker.Item key={index} label={item.org_name} value={item.org_id} />
                )                
            })
        )
    }

    const removeLocalStore = async () => {
        try {
            await AsyncStorage.removeItem('uuid')
          } catch(e) {
            // remove error
          }
    }

    const signout = ()=> {
        removeLocalStore();
        dispatch(doLogout());
    }


    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.Heading}>Branch</Text>
            <View style={styles.line}></View>
            <View style={styles.formWrapper}>
                <Text style={styles.formLabel}>Select Branch</Text>
                <View style={styles.inputWrapper}>
                    <Icon size={16} color="#626F7F" name="box" style={{position:"absolute", left:15, top:16}} />                   
                        <Picker
                            selectedValue={selectedVal}
                            style={{color:"#000"}}
                            dropdownIconColor="#000"
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedVal(itemValue)
                                
                            }
                            >
                                <Picker.Item label="Select Branch" value="0" />
                            {
                                branchItems()
                            }
                        </Picker>
                </View>


                <View style={{alignItems:"center"}}>
                    <TouchableOpacity disabled={selectedVal == 0 ? true : false} 
                        style={[styles.btnSubmit, {opacity:selectedVal == 0 ? 0.7 : 1}]} 
                        onPress={()=> navigation.navigate('activity', {
                            org_id:selectedVal
                        })}>
                        <Text style={{color:"#FFF", fontSize:18}}>NEXT</Text>               
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.btnSubmit} onPress={signout}>
                        <Text style={{color:"#FFF", fontSize:18}}>LOGOUT</Text>               
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

export default Branch;

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
