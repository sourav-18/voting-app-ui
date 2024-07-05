import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { candidateDetaisAsync, selectCndidteDetais, setsignInCandidateData } from '../../auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import Emty from "../../../Emty";
import dummyImage from "../../../assets/voter.jpg";
import { useNavigation } from "@react-navigation/native";
const CandidateProfile = () => {
  const iconsColor="#fb8500";
  const [press1,setPress1]=useState(false)
  const [press2,setPress2]=useState(false)
  const [press3,setPress3]=useState(false)
  const [press4,setPress4]=useState(false)
  const [press5,setPress5]=useState(false)
  const navigation=useNavigation()
  const dispatch=useDispatch();
  const handleSignOut=()=>{
    Alert.alert("Sign Out","Are you Sure !",[
        {
          text: 'No',
        },
        {
            text:'Yes',
            onPress:async()=>{
                await AsyncStorage.removeItem("jwt_token")
                await AsyncStorage.removeItem("currentLogin")
                dispatch(setsignInCandidateData(null))

              }

        }
      ],)
}
useEffect(()=>{
dispatch(candidateDetaisAsync())
},[])
const data = useSelector(selectCndidteDetais);
  return (
    data?<ScrollView style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.topItemOne}>
        <View style={styles.imageCard}>
          <Image style={styles.image} source={dummyImage} />
        </View>
        <Text style={styles.name}>{data.name} </Text>
      </View>
      <View style={styles.topItemtwo}>
        <View style={styles.typeCard}>
          <Text style={styles.typeText}>Candidate</Text>
        </View>
        <View style={styles.numberCard}>
          <View style={styles.numcardOne}>
            <Text style={styles.numberText}>{0}</Text>
            <Text style={styles.numberInfoText}> vote Done </Text>
          </View>
          <View style={styles.numcardTwo}>
            <Text style={styles.numberText}>{data.votingInfo.length}</Text>
            <Text style={styles.numberInfoText}>register Election</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.contactCard}>
      <View style={styles.contactItem}>
        <Feather name="phone" size={20} color="#6d6875" />
        <Text style={styles.contactText}>{data.phoneNumber}</Text>
      </View>
      <View style={styles.contactItem}>
      <MaterialCommunityIcons name="order-numeric-ascending" size={20} color="#6d6875" />
        <Text style={styles.contactText}>{data.aadharNumber}</Text>
      </View>
      <View style={styles.contactItem}>
        <AntDesign name="mail" size={20} color="#6d6875" />
        <Text style={styles.contactText}>{data.email}</Text>
      </View>
    </View>
    <View style={styles.category}>
      <Pressable onPress={()=>{navigation.navigate("CandiadateRegisterElection")}} style={[styles.categoryItem,{backgroundColor:!press1?"transparent":"#1232541f"}]} onPressIn={()=>{setPress1(true)}} onPressOut={()=>setPress1(false)}>
        <AntDesign name="picture" size={17} color={iconsColor} />
        <Text style={styles.categoryText}>Register Election</Text>
      </Pressable>
      <Pressable onPress={()=>{navigation.navigate("WinElection")}}  style={[styles.categoryItem,{backgroundColor:!press2?"transparent":"#1232541f"}]} onPressIn={()=>{setPress2(true)}} onPressOut={()=>setPress2(false)}>
        <AntDesign name="picture" size={17} color={iconsColor} />
        <Text style={styles.categoryText}>Win Election</Text>
      </Pressable>
      <Pressable  style={[styles.categoryItem,{backgroundColor:!press3?"transparent":"#1232541f"}]} onPressIn={()=>{setPress3(true)}} onPressOut={()=>setPress3(false)}>
        <AntDesign name="picture" size={17} color={iconsColor} />
        <Text style={styles.categoryText}>Working ...</Text>
      </Pressable>
      <Pressable o  style={[styles.categoryItem,{backgroundColor:!press4?"transparent":"#1232541f"}]} onPressIn={()=>{setPress4(true)}} onPressOut={()=>setPress4(false)}>
        <AntDesign name="picture" size={17} color={iconsColor} />
        <Text style={styles.categoryText}>working ...</Text>
      </Pressable>
    </View>
    <View style={styles.signOutCard}>

    <Pressable onPress={()=>handleSignOut()} style={[styles.signOut,{backgroundColor:!press5?"transparent":"#1232541f"}]} onPressIn={()=>{setPress5(true)}} onPressOut={()=>setPress5(false)}>
    <MaterialIcons name="logout" size={24} color={"red"} />
    <Text style={styles.signOutText}>SignOut</Text>
    </Pressable>
    </View>
  </ScrollView>:
  <View style={styles.signOutCard}>
   <Pressable onPress={()=>handleSignOut()} style={[styles.signOut,{backgroundColor:!press5?"transparent":"#1232541f"}]} onPressIn={()=>{setPress5(true)}} onPressOut={()=>setPress5(false)}>
   <MaterialIcons name="logout" size={24} color={"red"} />
   <Text style={styles.signOutText}>SignOut</Text>
   </Pressable>
   </View>
   
  )
}

export default CandidateProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2ece9",
  },
  image: {
    width: 140,
    height: 165,
    borderRadius: 10,
  },
  imageCard: {
    elevation: 10,
  },
  topContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    // alignItems: "center",
  },
  topItemOne: {},
  name: {
    fontSize: 16,
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 10,
    textAlign: "center",
    position: "absolute",
    top: 132,
  },
  numberInfoText: {
    fontSize: 14,
    color: "gray",
    alignSelf:"center",
  },
  numberText: {
    alignSelf:"center",
    fontSize: 35,
    fontWeight: "300",
    color: "black",
  },
  contactCard: {
    marginLeft: 15,
  },
  contactItem: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  contactText: {
    color: "#6d6875",
    marginLeft: 8,
  },
  numberCard: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  typeCard:{
    backgroundColor:"#8338ec",
    alignSelf:"center",
    paddingHorizontal:17,
    paddingVertical:10,
    borderRadius:10,
    marginTop:10,
    // elevation:10,
  },
  typeText:{
    color:"#edf6f9",
    fontSize:16,
  },
  topItemtwo:{
    justifyContent:"space-around",
    flex:1
  },
  category:{
    borderTopWidth:1,
    borderBottomWidth:1,
    borderBlockColor:"#1232541f",
    marginTop:20,
    paddingVertical:10,
  },
  categoryItem:{
    flexDirection:"row",
    paddingVertical:15,
    paddingHorizontal:20,
    alignItems:"center"
  },
  categoryText:{
    fontSize:16,
    marginLeft:10
  },
  signOut:{
    flexDirection:"row",
    paddingHorizontal:20,
    paddingVertical:15,
    backgroundColor:"blue",
    marginTop:10
  },
  signOutCard:{
    marginTop:20,
    alignItems:"center",
  
  }
});