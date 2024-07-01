import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectWinElection, winElectionAsync } from './candidateSlice'
import Emty from '../../../Emty'
import { styles } from '../voterComponents/VoterUpcomeingElection'
import { showResultAsync } from '../adminProfile/adminSlice';
import { useNavigation } from '@react-navigation/native';
const WinElection = () => {
    const navigation=useNavigation();
    const color=["#cdb4db","#99c1de"];
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(winElectionAsync());
    },[])
    const data=useSelector(selectWinElection);
    const handleShowResult=(_id)=>{
        dispatch(showResultAsync({_id}))
        navigation.navigate("Result")
    }
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
            <Pressable onPress={()=>handleShowResult(item._id)} style={innerStyle.btn}>
            <Text style={innerStyle.btnText}>Show Result</Text>
            <Feather  name="arrow-right" size={24} color="white"  />
            </Pressable>
      </View>
            )
        })}
    </ScrollView>
    :<Emty/>
  )
}

export default WinElection

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