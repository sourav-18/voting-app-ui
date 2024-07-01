import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateElectionAsync, selectCalculateElection, selectResponseOfCalculateElection, updateMessageDataFromAdmin } from './adminSlice';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import Emty from "../../../Emty"
const CalculateResult = () => {
  const [buttonPress,setButtonPress]=useState(false)
  const data = useSelector(selectCalculateElection);
  const responseData = useSelector(selectResponseOfCalculateElection);
  const dispatch = useDispatch();

  const handleResultCalculate = (id) => {
    setButtonPress(true)
    dispatch(calculateElectionAsync(id));
  };
  useEffect(()=>{
    dispatch(updateMessageDataFromAdmin(null))
  },[])
  
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {data ? (
        <View style={styles.container}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.text}>{data.type}</Text>
          <Text style={styles.description}>{data.description}</Text>
          {data.candidate.map((item, index) => (
            <View key={index} style={styles.candidateCard}>
              <View style={styles.candidateItem}>
                <Text>{item.candidateName}</Text>
                <Text>({item.partiesName})</Text>
              </View>
            </View>
          ))}
          <Button title='Calculate' onPress={() => handleResultCalculate(data._id)} />
          {buttonPress&&<Text style={styles.response}>{responseData ? responseData.message : ''}</Text>}
        </View>
      ) : <Emty/>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    marginBottom: 15,
  },
  candidateCard: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  candidateItem: {
    flexDirection: 'row',
  },
  response: {
    color: 'green',
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontSize: 14,
    marginTop: 10,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default CalculateResult;
