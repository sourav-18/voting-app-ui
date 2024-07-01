import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopulerElectionAsync, selectPopulerElection } from './adminSlice'

export default function End({role}) {
  const dispatch=useDispatch();
  const data=useSelector(selectPopulerElection)
  useEffect(()=>{
    dispatch(PopulerElectionAsync());
  },[])
  return (
    <View style={styles.container}>
      <View style={[styles.cardOne,styles.card]}>
       {data&&data.data&&data.data[0]?<View>
        <Text style={styles.populerElection}>Pouler Election One</Text>
        <Text style={styles.name}>{data.data[0].name}</Text>
        <Text style={styles.type}>{data.data[0].type}</Text>
        <Text style={styles.description}>{data.data[0].description?.slice(0,141)}.....</Text>
        </View>:<Text style={styles.working}>Working ..</Text>}
      </View>
      <View style={[styles.cardTwo,styles.card]}>
       {data&&data.data&&data.data[1]?<View>
        <Text style={styles.populerElection}>Pouler Election Two</Text>
        <Text style={styles.name}>{data.data[1].name}</Text>
        <Text style={styles.type}>{data.data[1].type}</Text>
        <Text style={styles.description}>{data.data[1].description?.slice(0,141)}.....</Text>
        </View>:<Text style={styles.working}>Working ..</Text>}
      </View>
      <View style={[styles.itemOne,styles.item]}><Text style={styles.about}>{role}</Text></View>
      <View style={[styles.itemTwo,styles.item]}><Text style={styles.about}>Hi Boos</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:15,
  },
  card:{
    width:"65%",
    height:"37%",
    margin:10,
    backgroundColor:"#bdb2ff",
    elevation:5,
    borderRadius:14,
   
  },
  cardTwo:{
    alignSelf:"flex-end",
  },
  item:{
    width:"25%",
    height:"37%",
    margin:10,
    elevation:5,
    backgroundColor:"#5390d9",
    position:"absolute",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
  },
  itemOne:{
    top:0,
    right:0,
  },
  itemTwo:{
    bottom:24,
    left:0,
  },
  populerElection:{
    textAlign:"center",
    fontWeight:'600',
    textTransform:"uppercase",
    fontSize:12,
    marginTop:10,
  },
  name:{
    textTransform:"capitalize",
    marginLeft:10,
    marginBottom:2,
    fontWeight:"bold",
    fontSize:12,
    marginRight:5,
  },
  type:{
    position:"absolute",
    right:4,
    top:4,
    backgroundColor:"#ffb703",
    padding:4,
    borderRadius:99,
    fontSize:8,
    textTransform:"uppercase",
  },
  description:{
    marginLeft:10,
    textTransform:"capitalize",
    marginRight:5,
    fontSize:10,
  },
  about:{
    textTransform:"capitalize",
    color:"white",
    fontSize:15,
    fontWeight:"bold",

  },
  working:{
    fontSize:20,
    textAlign:"center",
    marginTop:30,
  }
})