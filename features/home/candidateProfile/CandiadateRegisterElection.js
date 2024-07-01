import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {styles} from "./CandidateCurrentElection"
import { candidateShowRegisterElectionAsync, selectCandidateRegisterElection } from './candidateSlice';
import { useNavigation } from '@react-navigation/native';
import { showElectionAsync, showResultAsync } from '../adminProfile/adminSlice';
export default function CandiadateRegisterElection() {
  const navigation=useNavigation()
  const handleShowResult=(_id)=>{
    dispatch(showResultAsync({_id}))
    navigation.navigate("Result")
    
}
  const dispatch=useDispatch();
  const data=useSelector(selectCandidateRegisterElection)
  useEffect(()=>{
    dispatch(candidateShowRegisterElectionAsync());
  },[])
  const handleShowDetails=(_id)=>{
    dispatch(showElectionAsync({_id}));
    navigation.navigate("showElectionDetaisByCandidate")
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
            {
              !item.resultCalculat&&<Pressable onPress={()=>handleShowDetails(item._id)} style={[innerStyle.btn,{backgroundColor:"green"}]}>
              <Text style={innerStyle.btnText}>Show Details</Text>
              <Feather  name="arrow-right" size={24} color="white"  />
              </Pressable>
            }
      </View>
            )
        })}
        <View style={styles.addExtraSpace}></View>
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
