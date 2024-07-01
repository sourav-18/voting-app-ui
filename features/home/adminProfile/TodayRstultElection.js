import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selecttodayResultElection, showTodayResultElectionAsync, updateCalculateElectionDataData } from './adminSlice'
import { styles } from '../voterComponents/VoterUpcomeingElection';
import Emty from "../../../Emty"
import { useNavigation } from '@react-navigation/native';
const TodayRstultElection = () => {
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const data=useSelector(selecttodayResultElection);
  useEffect(()=>{
    dispatch(showTodayResultElectionAsync());
  },[])
  const handleGotoResultCaculate=(item)=>{
    dispatch(updateCalculateElectionDataData(item))
    navigation.navigate("CalculateResult")
  }
  const color=["#cdb4db","#99c1de"];
  return (
    data&&data.data&&data.data.length?
    <ScrollView style={styles.container}>
      {
        data.data.map((item,index)=>{
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
                    <Text key={index}>{data.partiesName} ({data.candidateName}) {item.candidate.length===index+1?"":"|| "}</Text>
                )
            })}
            </Text>
        </View>
            <Pressable onPress={()=>handleGotoResultCaculate(item)} style={innerStyle.btn}>
            <Text style={innerStyle.btnText}>Go To Calculate</Text>
            <Feather  name="arrow-right" size={24} color="white"  />
            </Pressable>
      </View>
            )
        })}
    </ScrollView>
    :<Emty/>
  )
}

export default TodayRstultElection

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