import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUpcomingElection, upDatetargetElection, upcomeingElectionAsync, updataeMessageFromVoter } from '../voterHomeSlice';
import { useNavigation } from '@react-navigation/native';

const VoterUpcomeingElection = () => {
    const navigation=useNavigation();
    const dispatch=useDispatch()
    const upcomeingElectionData=useSelector(selectUpcomingElection)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const handleGotoRegisterElectio=(item)=>{
        dispatch(upDatetargetElection(item))
        navigation.navigate("GotoRegisterElectionVoter")
    }
    
    useEffect(()=>{
        dispatch(upcomeingElectionAsync());
    },[])
    const color=["#cdb4db","#99c1de"];
  return (
    <ScrollView style={styles.container}>
      {
        upcomeingElectionData.map((item,index)=>{
            const startTime=new Date(item.periodOfTimeVoterRegistration.startTime)
            const endTime=new Date(item.periodOfTimeVoterRegistration.endTime)
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
        <View style={styles.register}>
            <Text style={styles.registerDate}>Registration: {startTime.getDate()}th {months[startTime.getMonth()]} to {endTime.getDate()} th {months[endTime.getMonth()]}</Text>
            <Pressable onPress={()=>handleGotoRegisterElectio(item)}>
            <Feather style={styles.registerBtn} name="arrow-right" size={24} color="white"  />
            </Pressable>
        </View>
      </View>
            )
        })}
         <View style={styles.addExtraSpace}></View>
    </ScrollView>
  )
}

export default VoterUpcomeingElection

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
        flexDirection:"row",
        fontSize:15,
        color:"#723c70",
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
    },
    addExtraSpace:{
        height:50,
      }
})