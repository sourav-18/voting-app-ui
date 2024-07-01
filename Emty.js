import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Emty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty </Text>
    </View>
  )
}

export default Emty

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:30,
        fontWeight:"bold",
    }
})
