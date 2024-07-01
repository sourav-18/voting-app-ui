import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View,Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Emty from '../../../Emty';
import { useNavigation } from '@react-navigation/native';
import {
  registerElectionAsync,
  selectMessFromVoter,
  selectTargetElection,
  upDatetargetElection,
  updataeMessageFromVoter,
} from '../voterHomeSlice';

export default function GotoRegisterElection() {
  const [press, setPress] = useState(false);
  const navigation = useNavigation();
  const message = useSelector(selectMessFromVoter);
  const dispatch = useDispatch();
  const data = useSelector(selectTargetElection);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const startTime = data ? new Date(data.periodOfTimeVoterRegistration.startTime) : '';
  const endTime = data ? new Date(data.periodOfTimeVoterRegistration.endTime) : '';

  const handleRegister = () => {
    setPress(true);
    dispatch(registerElectionAsync({ electionName: data.name, electionId: data._id }));
    Vibration.vibrate(5);
  };
  useEffect(()=>{
    dispatch(updataeMessageFromVoter(null))
  },[])
//  this logic only use when successfuly register then go back to home page
  // useEffect(() => {
  //   if (message && message.success) {
  //     setTimeout(() => {
  //       navigation.navigate("HomeContainer");
  //       dispatch(upDatetargetElection(null));
  //       dispatch(updataeMessageFromVoter(null));
  //     }, 2000);
  //   }
  // }, [message]);

  return (
    data ? <View style={styles.container}>
       <Text style={styles.heading}>Register for Election</Text>
      <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>Election Name: {data.name}</Text>
        <Text style={styles.description}>Election Description: {data.description}</Text>
        <Text style={styles.infoText}>Election Type: {data.type}</Text>
        <Text style={styles.infoText}>Candidates:</Text>
        <View style={styles.candidates}>
          {data.candidate.map((item, index) => (
            <Text key={index} style={styles.candidateText}>
              {item.partiesName} ({item.candidateName})
            </Text>
          ))}
        </View>
        <Text style={styles.registrationText}>
          Registration: {startTime.getDate()}th {months[startTime.getMonth()]} to {endTime.getDate()}th {months[endTime.getMonth()]}
        </Text>
        <Button title='Register' onPress={() => handleRegister()} />
        <Text style={styles.messageText}>{press && message && message.message ? message.message : ''}</Text>
      </View>
    </View></View> : <Emty />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems:"center",
    
  },
  heading: {
    fontSize: 24,
    fontWeight: '400',
    marginTop:40,
    letterSpacing:1,
    fontStyle:"italic",
    color: 'green', // Adjust color as needed
  },
  card:{
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
  info: {
    // marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  candidates: {
    marginBottom: 10,
  },
  candidateText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  registrationText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  messageText: {
    fontSize: 14,
    marginTop: 10,
    color: 'blue',
    textAlign:"center",
    textTransform:"capitalize",
  },
});
