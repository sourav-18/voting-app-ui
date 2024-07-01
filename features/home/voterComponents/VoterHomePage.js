import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Top from './Top'
import Mid from './Mid'
import End from '../adminProfile/End'

const VoterHomePage = () => {
  return (
    <View style={styles.container}>
      <Top/>
      <Mid/>
      <End role={"voter"} />
    </View>
  )
}

export default VoterHomePage
const styles = StyleSheet.create({
  container:{
    backgroundColor:"#eaf4f4",
    flex:1,
  }
})