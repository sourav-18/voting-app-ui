import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUnAttemptedVoter, unAttemptedVoterAsync } from '../voterHomeSlice';
import {styles} from "./VoterUpcomeingElection"
import { showResultAsync } from '../adminProfile/adminSlice';
import { useNavigation } from '@react-navigation/native';
export default function UnattemptedVote() {
  const navigation=useNavigation()
  const dispatch=useDispatch();
  const data=useSelector(selectUnAttemptedVoter)
  useEffect(()=>{
    dispatch(unAttemptedVoterAsync());
  },[])
  const handleShowResult=(_id)=>{
    dispatch(showResultAsync({_id}))
    navigation.navigate("Result")
    
}
  const color=["#cdb4db","#99c1de"];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <ScrollView style={styles.container}>
      {
        data.map((item,index)=>{
          const dateOfVotiong=new Date(item.dateOfVotiong)
            const resultDate=new Date(item.resultDate)
            const colorValue=index%2===0?0:1;
            return(
        <View key={index} style={[styles.card,{backgroundColor:color[colorValue]}]}>
        <View style={styles.title}>
            <Text style={styles.titleName}>{item.name} </Text>
            <Text style={styles.titleType}>{item.type}</Text>
        </View>
        <View style={styles.description}>
        <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View style={styles.candidate}>
            <Text style={styles.candidateText}>
            <Text>Candidate: </Text>
            {item.candidate.map((data,index)=>{
                return(
                    <Text key={index}>{data.partiesName} ({data.candidateName}) {item.candidate.length===index+1?"":"||"}</Text>
                )
            })}
            </Text>
        </View>
        {item.resultCalculat?<Pressable onPress={()=>handleShowResult(item._id)} style={innerStyle.btn}>
            <Text style={innerStyle.btnText}>Show Resut</Text>
            <Feather  name="arrow-right" size={24} color="white"  />
            </Pressable>:
            <View style={innerStyle.dateCard}>
               <Text style={innerStyle.dateText} >Voting Date: {dateOfVotiong.getDate()}th {months[dateOfVotiong.getMonth()]}  ||  </Text>
               <Text style={innerStyle.dateText} >Result Date: {resultDate.getDate()}th {months[resultDate.getMonth()]} </Text>
            </View>
            }
      </View>
            )
        })}
    </ScrollView>
  )
}
const innerStyle = StyleSheet.create({
  btn:{
    flexDirection:"row",
    backgroundColor:"#fb8500",
    alignItems:"center",
    justifyContent:"center",
    padding:3,
    marginTop:5,
    borderRadius:10,
},
btnText:{
    fontSize:16,
    marginRight:5
},
dateText:{
  textAlign:"center",
  textTransform:"capitalize",
  color:"yellow",
},
dateCard:{
  flexDirection:"row",
}
})
