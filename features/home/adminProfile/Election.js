import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteElectionAsync,
  selectAdminMessage,
  selectElection,
  showElectionAsync,
  showResultAsync,
  updateMessageDataFromAdmin,
} from './adminSlice';
import Emty from '../../../Emty';
import { useNavigation } from '@react-navigation/native';

const Election = () => {
  const [buttonPress, setButtonPress] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const electionData = useSelector(selectElection);
  const messageData = useSelector(selectAdminMessage);

  useEffect(() => {
    dispatch(updateMessageDataFromAdmin(null));
  }, []);

  if (!electionData || !electionData.data) {
    return <Emty />;
  }

  const handleShowResult = (_id) => {
    dispatch(showResultAsync({ _id }));
    navigation.navigate('Result');
  };

  const handleEdit = (_id) => {
    navigation.navigate('EditElectin');
    dispatch(showElectionAsync({ _id }));
  };

  const handleDelete = (_id) => {
    Alert.alert('Delete Election', 'Are you Sure To Delete This !', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          setButtonPress(true);
          dispatch(deleteElectionAsync(_id));
        },
      },
    ]);
  };

  const { data } = electionData;
  const voterstartTime = new Date(data.periodOfTimeVoterRegistration.startTime);
  const voteEndTime = new Date(data.periodOfTimeVoterRegistration.endTime);
  const candidateStartTime = new Date(
    data.periodOfTimeCandidateRegistration.startTime
  );
  const candidateEnadTime = new Date(
    data.periodOfTimeCandidateRegistration.endTime
  );
  const dateOfVotiong = new Date(data.dateOfVotiong);
  const resultDate = new Date(data.resultDate);
  const today = Date.now();
  const candidateStartDate = data.periodOfTimeCandidateRegistration.startTime;

  return (
    <View>
        <Text style={styles.heading}>Election Details</Text>
  
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.type}>{data.type}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <View style={styles.candidateList}>
          {data.candidate.map((data, index) => (
            <View key={index} style={styles.candidateItem}>
              <Text style={styles.candidateText}>
                {data.partiesName} ({data.candidateName})
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.registrationPeriod}>
          <Text style={styles.registrationText}>
            Voter Registration: {voterstartTime.getDate()}th{' '}
            {months[voterstartTime.getMonth()]} to {voteEndTime.getDate()}th{' '}
            {months[voteEndTime.getMonth()]}
          </Text>
          <Text style={styles.registrationText}>
            Candidate Registration: {candidateStartTime.getDate()}th{' '}
            {months[candidateStartTime.getMonth()]} to{' '}
            {candidateEnadTime.getDate()}th {months[candidateEnadTime.getMonth()]}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Voting Date: {dateOfVotiong.getDate()}th{' '}
            {months[dateOfVotiong.getMonth()]}
          </Text>
          <Text style={styles.dateText}>
            Result Date: {resultDate.getDate()}th{' '}
            {months[resultDate.getMonth()]}
          </Text>
          {today < candidateStartDate && (
            <View style={styles.action}>
              <Button title="Edit" onPress={() => handleEdit(data._id)} />
              <Button title="Delete" onPress={() => handleDelete(data._id)} />
            </View>
          )}
          {data.resultCalculat && (
            <Button
              title="Show Result"
              onPress={() => handleShowResult(data._id)}
            />
          )}
        </View>
        {messageData && buttonPress ? (
          <Text style={styles.message}>{messageData.message}</Text>
        ) : null}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    heading:{
        fontSize:26,
        textAlign:"center",
        marginTop:20,
        letterSpacing:2,
        fontWeight:"bold",
        textTransform:"uppercase",
        color:"green",
    },
    type:{
        backgroundColor:"#ffb703",
        position:"absolute",
        padding:10,
        right:6,
        top:12,
        borderRadius:99,
    },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    textTransform:"capitalize",
    textAlign:"center",
    marginBottom: 10,

  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    color:"#333333",
    textTransform:"capitalize",
  },
  candidateList: {
    marginBottom: 20,
  },
  candidateItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
  },
  candidateText: {
    fontSize: 16,
  },
  registrationPeriod: {
    marginBottom: 20,
  },
  registrationText: {
    fontSize: 16,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,
  },
  action: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  message: {
    color: 'green',
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: 2,
    fontSize: 13,
    marginTop: 10,
  },
  
});

export default Election;
