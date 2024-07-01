import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectEdited,  showEditedElectionAsync, showElectionAsync } from './adminSlice';
import Emty from "../../../Emty"
import { styles } from '../voterComponents/VoterUpcomeingElection';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const ShowEditedElection = () => {
    const navigation=useNavigation()
    const dispatch=useDispatch();
    const data=useSelector(selectEdited)
    useEffect(()=>{
        dispatch(showEditedElectionAsync())
    },[])
    const handleShowDetails=(_id)=>{
      dispatch(showElectionAsync({_id}));
      navigation.navigate("Election")
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
            <Pressable onPress={()=>handleShowDetails(item._id)} style={innerStyle.btn}>
            <Text style={innerStyle.btnText}>Show Details</Text>
            <Feather  name="arrow-right" size={24} color="white"  />
            </Pressable>
      </View>
            )
        })}
        <View style={styles.addExtraSpace}></View>
    </ScrollView>
    :<Emty/>
  )
}

export default ShowEditedElection

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