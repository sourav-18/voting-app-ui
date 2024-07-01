import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Top from './Top'
import Mid from './Mid'
import End from '../adminProfile/End'

export default function CandidateHomePage() {
  return (
    <View style={styles.container}>
      <Top/>
      <Mid/>
      <End role={"candidate"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#eaf4f4",
    flex:1,
  }
})