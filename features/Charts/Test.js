import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import PieChart from 'react-native-pie-chart'

export default class TestChart extends Component {
  render() {
    const widthAndHeight = 250
    const series = [10, 20, 30, 15, 25]
    const sliceColor = ["black", 'blue', 'orange', 'green', 'red']

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Basic</Text>
          <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
})