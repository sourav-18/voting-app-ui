import { StyleSheet, ScrollView, Text, View } from 'react-native'
import PieChart from 'react-native-pie-chart'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectResut, showResultAsync } from './adminSlice';
import Emty from '../../../Emty';
const Result = () => {
  function getRandomHexColor() {
    const characters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const widthAndHeight=250;
  const dispatch=useDispatch();
  const result=useSelector(selectResut)
  if(!result){
    return(
      <Emty/>
    )
  }
  const {data}=result
  const Colors = [
    '#ff006e',
    '#ffb703',
    '#336BFF',
    '#34a0a4',
    '#006d77',
    "#5a189a",
    '#B533FF',
    '#3e1f47',
    '#e4c1f9',
  ]  
  const chartData={candidateName:[],totalGetVote:[],sliceColor:[],partiesName:[]}
  data.finalResult.candidate.map((item,index)=>{
    chartData.candidateName.push(item.candidateName)
    chartData.totalGetVote.push(item.totalGetVote)
    chartData.partiesName.push(item.partiesName)
    chartData.sliceColor.push(Colors[index])
  })
  const mapArray=new Array(chartData.candidateName.length).fill(0)
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <Text style={styles.name}>{data.name}</Text>
        <Text><Text style={styles.type}>{data.type}</Text></Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>

      {data.finalResult.WinCanidate&&<View style={styles.resultContainer}>
        <Text style={styles.winnerText}>
          Winner is: {data.finalResult.WinCanidate?.partiesName} {data.finalResult.WinCanidate?.candidateName} ({data.finalResult.WinCanidate?.totalGetVote} votes)
        </Text>
      </View>}

      {data.finalResult.WinCanidate&& <View style={styles.container}>
        <PieChart widthAndHeight={widthAndHeight} series={chartData.totalGetVote} sliceColor={chartData.sliceColor} />
      </View>}

      <View style={styles.infoCard}>
        {mapArray.map((item, index) => {
          return (
            <View key={index} style={styles.infoContainer}>
              <View style={[styles.colorCircle, { backgroundColor: chartData.sliceColor[index] }]} />
              <Text style={styles.candidateName}>{chartData.candidateName[index]}</Text>
              <Text style={styles.voteText}>
              {chartData.totalGetVote[index]} out of {data.finalResult.totalVote}
              </Text>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
  
}

export default Result


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20, // Adds top margin to the container
  },
  title: {
    fontSize: 24,
    marginVertical: 10, // Adds vertical margin around the title
    fontWeight: 'bold', // Makes the title bold
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: 'center', // Aligns items in rows vertically centered
    marginBottom: 10, // Adds bottom margin between info containers
  },
  colorCircle: {
    backgroundColor: 'red', // Default color for the circles, change as needed
    width: 20,
    height: 20,
    borderRadius: 10, // Makes a perfect circle by setting borderRadius to half of width/height
    marginRight: 10, // Adds space between color circle and text
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  voteText: {
    fontSize: 14,
    marginLeft: 10, // Adds space between candidate name and vote text
  },
  resultContainer: {
    padding: 10, // Adds padding around the result container
    backgroundColor: '#f5f5f5', // Changes the background color of the result container
    marginTop: 20, // Adds top margin between result container and other elements
  },
  winnerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 // Updated styles
 topSection: {
  padding: 20,
  paddingBottom:2,
  backgroundColor: '#f0f0f0',
},
name: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 5,
  color: '#333',
  letterSpacing:2,
  textTransform:'uppercase',
  textAlign:"center"
},
type: {
  fontSize: 18,
  fontWeight: 'bold',
  backgroundColor: '#FFD700',
  padding: 5,
  borderRadius: 5,
},
description: {
  fontSize: 16,
  color: '#555',
},
winnerText: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  letterSpacing: 1,
  color: '#008080',
},
infoContainer: {
  flexDirection: "row",
  alignItems: 'center',
  marginBottom: 10,
  padding: 10,
  backgroundColor: '#ffffff',
  borderRadius: 8,
},
colorCircle: {
  backgroundColor: 'red',
  width: 20,
  height: 20,
  borderRadius: 10,
  marginRight: 10,
},
candidateName: {
  fontSize: 16,
  fontWeight: 'bold',
  flex: 1,
  color: '#333',
},
voteText: {
  fontSize: 14,
  flex: 1,
  color: '#555',
},
infoCard:{
  marginTop:20,
}
});
