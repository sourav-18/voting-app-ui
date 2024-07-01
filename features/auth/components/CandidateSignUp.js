import { Button, StyleSheet, Text, View } from 'react-native'
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
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {  selectSignUpCandidate, setsignInCandidateData, setsignInVoterData, signUpCandidateAsync } from '../authSlice'

const CandidateSignUp = ({navigation}) => {
    const dispatch=useDispatch()
    const styles=AuthFromStyle;
    const [aadharNumber,setAadharNumber]=useState("");
    const [name,setName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [partiesName,setpartiesName]=useState("");
    const [aboutCandidate,setAaboutCandidate]=useState("");
    const [errorAction,setErrorAction]=useState(false)
    const signupCandidateData= useSelector(selectSignUpCandidate)
    const errorText={aadharNumber:"fill aadharnumber",name:"fill name",email:"fill email",phoneNumber:"fill phonnumber",password:"fill password",PartiesName:"fiil partiesName",aboutCandidate:"fill aboutCandidate"}
    const handleSignUp=()=>{
     setErrorAction(true)
     if(email&&password&&name&&phoneNumber&&aadharNumber){
        dispatch(signUpCandidateAsync({name,password,aadharNumber,phoneNumber,email,partiesName,aboutCandidate}))
     }
    }
    useEffect(()=>{
      if(signupCandidateData?.success){
        setName(""),setAadharNumber(""),setEmail(""),setPassword(""),setPhoneNumber(""),setpartiesName(""),setAaboutCandidate("") //clear date after successfuly signUp
        dispatch(setsignInVoterData(null));
        dispatch(setsignInCandidateData(null));
        setErrorAction(false)
        navigation.navigate("Signin",{signInType:"Candidate",from:"Candidatesignup"})
      }
    },[signupCandidateData])
     
  return (
    <SafeAreaView style={[styles.container,{paddingTop:10}]} behavior='height'>
        <ScrollView>
      <View style={styles.Card}  >

        <View style={styles.inputCard} >

            <View style={styles.inputItem}>
            <MaterialCommunityIcons name="order-numeric-ascending" size={24} color="black" />
            <TextInput style={styles.input} value={aadharNumber} onChangeText={setAadharNumber} placeholder='Aadharnumber'/>
            <Text style={styles.error}>{!aadharNumber&&errorAction?errorText.aadharNumber:""}</Text>
            </View>

            <View style={styles.inputItem} >
            <Ionicons name="text-outline" size={24} color="black" />
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Enter Name'/>
            <Text style={styles.error}>{!name&&errorAction?errorText.name:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <MaterialCommunityIcons name="email-fast-outline" size={24} color="black" />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Enter Email'/>
            <Text style={styles.error}>{!email&&errorAction?errorText.email:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <Ionicons name="call-outline" size={24} color="black" />
            <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder='Enter Phonenumber'/>
            <Text style={styles.error}>{!email&&errorAction?errorText.email:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <Entypo name="text" size={24} color="black" />
            <TextInput style={styles.input} value={partiesName} onChangeText={setpartiesName} placeholder='Enter PartieName'/>
            <Text style={styles.error}>{!partiesName&&errorAction?errorText.PartiesName:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <Entypo name="text" size={24} color="black" />
            <TextInput style={styles.input} value={aboutCandidate} onChangeText={setAaboutCandidate} placeholder='about' multiline/>
            <Text style={styles.error}>{!aboutCandidate&&errorAction?errorText.aboutCandidate:""}</Text>
            </View>
            <View style={styles.inputItem} >
            <AntDesign name="unlock" size={24} color="black" />
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Password'/>
            <Text style={styles.error}>{!password&&errorAction?errorText.password:""}</Text>
            </View>
        </View>
            <View style={styles.btn}>
                
                {/* <Pressable><Text style={styles.btnText}>SIGN IN</Text></Pressable> */}
                <Button onPress={()=>handleSignUp()} title='SIGN UP'/>
            </View>
            <View style={styles.foterItem}>
                <Text style={styles.foterTextFirst}>Don,t have an a account?</Text>
                 <Pressable onPress={()=>navigation.navigate("Signin",{signInType:"Candidate",from:"Candidatesignup"})}><Text style={styles.foterTextLast}>SIGN In..!</Text></Pressable>
            </View>
            <Text>{signupCandidateData?.message}</Text>
      </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CandidateSignUp

const styles = StyleSheet.create({})