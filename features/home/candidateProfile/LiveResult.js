import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLiveResult, showLiveResultAsync } from './candidateSlice';
import Emty from '../../../Emty';

const LiveResult = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(showLiveResultAsync())
    },[])
    const ElectionData=useSelector(selectLiveResult)
    if(!ElectionData||!ElectionData.data){
        return(
            <Emty/>
            )
        }
        const {data}=ElectionData;
        const color=["#cdb4db","#99c1de"];
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
            {item.candidate.map((value,index)=>{
                return(
                    <Text style={styles.candidateText} key={index}>{value.partiesName} ({value.candidateName}) vote Get : {value.totalGetVote}</Text>
                )
            })}
        </View>
      </View>
            )
        })}
    </ScrollView>
  )
}

export default LiveResult

export const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        // paddingHorizontal:15,
        // marginBottom:20,
    },
    card:{
        backgroundColor:"#cdb4db",
        elevation:10,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        marginHorizontal:15,
    },
    title:{
        justifyContent:"space-between",
        flexDirection:"row",
    },
    titleName:{
        fontSize:20,
        fontWeight:"600",
    },
    titleType:{
        fontSize:20,
        fontWeight:"600",
        // backgroundColor:"#f94144",
        color:"#013a63",
        borderRadius:10,
        // textAlign:"center",
        paddingVertical:1,
        paddingHorizontal:9
    },
    descriptionText:{
        marginVertical:5,
        fontSize:16,
        
    },

    candidateText:{
       backgroundColor:"yellow",
       marginBottom:3,
       marginTop:3,
        fontSize:15,
        color:"#723c70",
        padding:5,
        borderRadius:5,
    },
    register:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    registerDate:{
        fontSize:15,
    },
    registerBtn:{
        backgroundColor:"#f20089",
       padding:12,
        borderRadius:99
    }
})