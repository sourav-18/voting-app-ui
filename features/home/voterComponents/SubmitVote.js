import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessFromVoter, selectSubmitVoteData, submitVoteAsync } from '../voterHomeSlice';
import Emty from '../../../Emty';
const SubmitVote = () => {
  const message = useSelector(selectMessFromVoter);
  const dispatch = useDispatch();
  const data = useSelector(selectSubmitVoteData);
  const [buttonPress,setButtonPres]=useState(false)
  const handleSubmitVote = (item, electionId) => {
    setButtonPres(true)
    const voteData = {
      electionId,
      candidateAadharNumber: item.aadharNumber,
      candidateName: item.candidateName,
      PartiesName: item.partiesName,
    };
    dispatch(submitVoteAsync(voteData));
  };

  return data ? (
    <View style={styles.container}>
      <Text style={styles.title}>Election Name: {data.name}</Text>
      <Text>Type: {data.type}</Text>
      <Text>Description: {data.description}</Text>
      {data.candidate.map((item, index) => (
        <View key={index} style={styles.candidateCard}>
          <View style={styles.candidateItem}>
            <Text style={styles.candidateText}>{item.candidateName}</Text>
            <Text style={styles.candidateText}>{item.partiesName}</Text>
          </View>
          <Button title="Vote" onPress={() => handleSubmitVote(item, data._id)} />
        </View>
      ))}
     {buttonPress&& <Text style={styles.message}>{message ? message.message : ''}</Text>}
    </View>
  ) : (
    <Epty />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  candidateCard: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  candidateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  candidateText: {
    marginRight: 10,
  },
  message: {
    marginTop: 10,
    textAlign:"center",
    textTransform:"capitalize",
    color: 'green', // Adjust color as needed
  },
});

export default SubmitVote;
