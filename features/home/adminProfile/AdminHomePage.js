import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Top from './Top'
import Mid from './Mid'
import End from './End'

export default function AdminHomePage() {
  return (
    <View style={styles.container}>
     <Top/>
     <Mid/>
     <End role={"admin"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#eaf4f4",
    flex:1,
  }
})