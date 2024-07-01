import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerElecionCandidateAsync,
  selectMessFromCandidate,
  selectTargetElectionCandidate,
  upDatetargetElectionCandidate,
  updteMessageFromCandidaet,
} from './candidateSlice';
import { useNavigation } from '@react-navigation/native';
import Emty from '../../../Emty';

const GoToRegisterElectionCandidate = () => {
  const navigation = useNavigation();
  const data = useSelector(selectTargetElectionCandidate);
  const message = useSelector(selectMessFromCandidate);
  const dispatch = useDispatch();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startTime = data ? new Date(data.periodOfTimeCandidateRegistration.startTime) : '';
  const endTime = data ? new Date(data.periodOfTimeCandidateRegistration.endTime) : '';
  const [buttonPress,setButtonPress]=useState(false)
  const handleRegister = () => {
    setButtonPress(true);
    dispatch(registerElecionCandidateAsync({ electionName: data.name, electionId: data._id }));
  };
  useEffect(()=>{
    dispatch(updteMessageFromCandidaet(null))
},[])
  // useEffect(() => {
  //   if (message && message.success) {
  //     setTimeout(() => {
  //       navigation.navigate('HomeContainer');
  //       dispatch(updteMessageFromCandidaet(null));
  //       dispatch(upDatetargetElectionCandidate(null));
  //     }, 2000);
  //   }
  // }, [message]);

  return data ? (
    <View style={styles.container}>
    <Text style={styles.heading}>Register for Election</Text>
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Election Name: {data.name}</Text>
        <Text><Text style={styles.heighlightText}> Election Description : </Text> {data.description}</Text>
        <Text>Election Type: {data.type}</Text>

        <View style={styles.candidates}>
          <Text style={styles.heighlightText}>Candidates  </Text>
          {data.candidate.map((item, index) => (
            <Text key={index} >
              {item.partiesName} ({item.candidateName})
            </Text>
          ))}
        </View>

        <View style={styles.registration}>
          <Text style={styles.heighlightText}>Registration Period</Text>
          <Text>
            {startTime.getDate()}th {months[startTime.getMonth()]} to {endTime.getDate()}th{' '}
            {months[endTime.getMonth()]}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {buttonPress&&<Text style={styles.message}>{message && message.message ? message.message : ''}</Text>}
      </View>
    </View>
  ) : (
    <Emty />
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop:90,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: '400',
    
    letterSpacing:1,
    fontStyle:"italic",
    marginBottom: 20,
    color: 'green', // Adjust color as needed
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  candidates: {
    marginVertical: 10,
  },
  registration: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message:{
    color:"blue",
    textAlign:"center",
    textTransform:"capitalize",
    letterSpacing:2,
    paddingTop:5,
  },
  heighlightText:{
    fontWeight:'500',
  }
});

export default GoToRegisterElectionCandidate;
