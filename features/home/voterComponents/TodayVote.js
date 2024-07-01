import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import {styles} from "./VoterUpcomeingElection"
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayElection, showTodayElectionAsync, updateSubmitVote } from '../voterHomeSlice';
import { useNavigation } from '@react-navigation/native';
const TodayVote = () => {
    const color=["#cdb4db","#99c1de"];
    const dispatch=useDispatch();
    const navigation=useNavigation();
    const data=useSelector(selectTodayElection);
    useEffect(()=>{
        dispatch(showTodayElectionAsync())
    },[])
    const handleVote=(item)=>{
        dispatch(updateSubmitVote(item))
        navigation.navigate("SubmitVote")
    }
// const data=[];
// console.log(datap)
  return (
    <ScrollView style={styles.container}>
    {
      data.map((item,index)=>{
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
          <Pressable style={innerStyle.btn} onPress={()=>handleVote(item)}>
            <Text style={innerStyle.btnText}>Go To Vote</Text>
          <Feather  name="arrow-right" size={24} color="white"  />
          </Pressable>
      </View>
          )
      })}
  </ScrollView>
  )
}

export default TodayVote
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
    }
})
