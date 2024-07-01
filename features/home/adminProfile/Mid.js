import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
const Mid = () => {
  const navigator=useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Ionicons style={styles.iconOne} name="hand-right-outline" size={24} color="white" />
        <Text style={styles.text}>Show All Result </Text>
       <Pressable onPress={()=>navigator.navigate("AllElectionResult")}><Octicons style={styles.iconTow} name="chevron-right" size={30} color="white" /></Pressable>
      </View>
      <View style={styles.card}>
      <Ionicons style={styles.iconOne} name="hand-right-outline" size={24} color="white" />
        <Text style={styles.text}>Show All Election </Text>
       <Pressable onPress={()=>navigator.navigate("AllElection")}><Octicons style={styles.iconTow} name="chevron-right" size={30} color="white" /></Pressable>
      </View>
      <View style={styles.card}>
      <Feather style={styles.iconOne} name="edit" size={24} color="white" />
        <Text style={styles.text}>Edited Election</Text>
       <Pressable onPress={()=>navigator.navigate("ShowEditedElection")}><Octicons style={styles.iconTow} name="chevron-right" size={30} color="white" /></Pressable>
      </View>
    </View>
  )
}

export default Mid

const styles = StyleSheet.create({
    container:{
        paddingTop:30,
        marginHorizontal:10,
    },
    card:{
        // justifyContent:"space-between",
        padding:18,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"#cdb4db",
        elevation:10,
        borderRadius:10,
        // alignContent:"center",
        alignItems:"center",
        marginVertical:10,
    },
    text:{
        fontSize:19,
        // fontWeight:"500"
    },
    iconOne:{
        backgroundColor:"#013a63",
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10
    },
    iconTow:{
        backgroundColor:"#013a63",
        paddingHorizontal:12,
        paddingVertical:2,
        borderRadius:5
    }
})