import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthFromStyle } from '../Style/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignInAsync, selectAdminMessage, selectAdminToken, updateMessageDataFromAdmin } from '../../home/adminProfile/adminSlice';
import { useNavigation } from '@react-navigation/native';
import { _storeData } from '../../../localStorage';
const AdminSignIn = () => {
    const dispatch=useDispatch();
    const navigation=useNavigation();
    const styles=AuthFromStyle;
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [errorAction,setErrorAction]=useState(false)
    const adminMessage=useSelector(selectAdminMessage);
    const adminToken=useSelector(selectAdminToken);
    const errorText={name:"fill the name",password:"fill the password "}
    const handleAdminSignIn=async()=>{
        setErrorAction(true)
        console.log({name,password})
        if(name&&password){
            dispatch(adminSignInAsync({name:name.trim(),password:password.trim()}));
        }
    }
    useEffect(()=>{
        dispatch(updateMessageDataFromAdmin(null))
        if(adminToken){
            navigation.navigate("HomeContainer")
            _storeData("currentLogin","admin");
        }
    },[adminToken])
  return (
    <SafeAreaView style={styles.container} behavior="height" >
        <View  style={styles.titleCard}>
            <Text style={styles.title}>Welcome Back Admin !</Text>
            <Text style={styles.smallTitle}>Sign In to Continue</Text>
        </View>
        <ScrollView>
      <View  style={styles.Card}  >
        <View style={styles.inputCard} >

            <View style={styles.inputItem}>
            <MaterialCommunityIcons name="order-numeric-ascending" size={24} color="black" />
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Name'/>
            <Text style={styles.error}>{!name&&errorAction?errorText.name:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <AntDesign name="unlock" size={24} color="black" />
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Password'/>
            <Text style={styles.error}>{!password&&errorAction?errorText.password:""}</Text>
            </View>
        </View>
            <View style={styles.btn}>
                <Button title='SIGN IN' onPress={()=>handleAdminSignIn()}   color="#2A3C5D"/>
                {/* <ActivityIndicator size="small" animating={loading==="idel"?false:true}/> */}
            </View>
            {adminMessage&&<Text style={innerStyle.message} >{adminMessage.message}</Text>}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default AdminSignIn
const innerStyle = StyleSheet.create({
    message:{
        color:"green",
        textAlign:"center",
        textTransform:"capitalize",
        letterSpacing:2,
        fontSize:13,
        marginTop:10,
    }
})
