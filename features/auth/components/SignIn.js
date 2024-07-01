import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { Platform } from 'react-native'
import { TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native'
import { AuthFromStyle } from '../Style/Auth'
import { ScrollView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { increment, selectAuthMessage, selectError, selectSignInCandidate, selectSignInVoter, selectStatus,signInCandidateAsync,signInVoterAsync } from '../authSlice'
import { useNavigation } from '@react-navigation/native'
import { _storeData } from '../../../localStorage'
import { adminSignInAsync } from '../../home/adminProfile/adminSlice'
const SignIn = ({navigation,route}) => {
  const {from}=route.params;
  // if(!from){
  //   from.name="Signupvoter";
  // }
  const styles=AuthFromStyle;
  const voterData=useSelector(selectSignInVoter)
  const AuthMessage=useSelector(selectAuthMessage)
  const signInCandidateData=useSelector(selectSignInCandidate)
  const dispatch=useDispatch()
    const [aadharNumber,setAadharNumber]=useState("");
    const [password,setPassword]=useState("");
    const [errorAction,setErrorAction]=useState(false)
    const errorText={password:"fill passwrod",aadharNumber:"fill aadharNumber"}
  const handleSignin=()=>{
  const setCurrentLogin=async(value)=>{
      await _storeData("currentLogin",value)
  }
   setErrorAction(true)
    if(aadharNumber&&password){
      if(from==="Candidatesignup"){
        dispatch(signInCandidateAsync({aadharNumber:aadharNumber.trim(),password:password.trim()}))
        setCurrentLogin("candidate")
        return
      }
      if(from==="Votersignup"){
        dispatch(signInVoterAsync({aadharNumber:aadharNumber.trim(),password:password.trim()}))
        setCurrentLogin("voter")
        return;
      }
    }
  }
  useEffect(()=>{
    if(from==="Candidatesignup"){
      if(signInCandidateData){
        setAadharNumber(""),setPassword("")
        navigation.navigate("HomeContainer",{from:"candidate"});
      }
      return;
    }
    if(from==="Votersignup"){
      if(voterData){
        setAadharNumber(""),setPassword("")
        navigation.navigate("HomeContainer",{from:"voter"});
      }
      return;
    }
  },[voterData,signInCandidateData])
  return (
    <SafeAreaView style={styles.container} behavior="height" >
        <View  style={styles.titleCard}>
            <Text style={styles.title}>Welcome Back !</Text>
            <Text style={styles.smallTitle}>Sign In to Continue</Text>
        </View>
        <ScrollView>
      <View  style={styles.Card}  >
        <View style={styles.inputCard} >

            <View style={styles.inputItem}>
            <MaterialCommunityIcons name="order-numeric-ascending" size={24} color="black" />
            <TextInput style={styles.input} value={aadharNumber} onChangeText={setAadharNumber} placeholder='Aadharnumber'/>
            <Text style={styles.error}>{!aadharNumber&&errorAction?errorText.aadharNumber:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <AntDesign name="unlock" size={24} color="black" />
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Password'/>
            <Text style={styles.error}>{!password&&errorAction?errorText.password:""}</Text>
            </View>
        </View>
            <View style={styles.btn}>
                <Button title='SIGN IN' onPress={()=>handleSignin()}   color="#2A3C5D"/>
                {/* <ActivityIndicator size="small" animating={loading==="idel"?false:true}/> */}
            </View>
           { from?<View style={styles.foterItem}>
                <Text style={styles.foterTextFirst}>Don,t have an a account?</Text>
                 <Pressable onPress={()=>navigation.navigate(from)}><Text style={styles.foterTextLast}>SIGN UP..!</Text></Pressable>
            </View>:''}
            {errorAction&&<Text style={styles.authMessage}>{AuthMessage}</Text>}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

