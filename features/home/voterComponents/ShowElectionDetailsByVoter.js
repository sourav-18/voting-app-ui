import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Emty from '../../../Emty';
import { useNavigation } from '@react-navigation/native';
import { selectElection } from '../adminProfile/adminSlice';
import { removeNameAsync, selectMessFromVoter, updataeMessageFromVoter } from '../voterHomeSlice';


const ShowDetaisCandidate = () => {
    const [buttonPress,setButtonPress]=useState(false)
    const navigation=useNavigation()
    const messageData=useSelector(selectMessFromVoter)
    const dispatch=useDispatch();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const electionData=useSelector(selectElection)

    useEffect(()=>{
        dispatch(updataeMessageFromVoter(null))
    },[])
    if(!electionData||!electionData.data){
        return(
            <Emty/>
        )
    }
    const handleRemove=(_id)=>{
        setButtonPress(true);
        dispatch(removeNameAsync({_id}));
    }
    const {data}=electionData;
    const voterstartTime=new Date(data.periodOfTimeVoterRegistration.startTime)
    const voteEndTime=new Date(data.periodOfTimeVoterRegistration.endTime)
    const candidateStartTime=new Date(data.periodOfTimeCandidateRegistration.startTime)
    const candidateEnadTime=new Date(data.periodOfTimeCandidateRegistration.endTime)
    const dateOfVotiong=new Date(data.dateOfVotiong)
    const today=Date.now();
    const voterEndDate=data.periodOfTimeVoterRegistration.endTime;
    const resultDate=new Date(data.resultDate)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.text}>{data.type}</Text>
            <Text style={styles.description}>{data.description}</Text>
            {/* Candidate list */}
            <View style={styles.candidateList}>
                {data.candidate.map((data, index) => (
                    <View key={index} style={styles.candidateItem}>
                        <Text style={styles.candidateText}>
                            {data.partiesName} ({data.candidateName})
                        </Text>
                    </View>
                ))}
            </View>
            {/* Registration periods */}
            <View style={styles.registrationPeriod}>
                <Text style={styles.registrationText}>
                    Voter Registration: {voterstartTime.getDate()}th {months[voterstartTime.getMonth()]} to {voteEndTime.getDate()}th {months[voteEndTime.getMonth()]}
                </Text>
                <Text style={styles.registrationText}>
                    Candidate Registration: {candidateStartTime.getDate()}th {months[candidateStartTime.getMonth()]} to {candidateEnadTime.getDate()}th {months[candidateEnadTime.getMonth()]}
                </Text>
            </View>
            {/* Voting and result dates */}
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                    Voting Date: {dateOfVotiong.getDate()}th {months[dateOfVotiong.getMonth()]}
                </Text>
                <Text style={styles.dateText}>
                    Result Date: {resultDate.getDate()}th {months[resultDate.getMonth()]}
                </Text>
            </View>
           { today<voterEndDate?<Button title='remove name form Election' onPress={()=>handleRemove(data._id)}/>:null}
           {messageData&&buttonPress?<Text style={styles.message}>{messageData.message}</Text>:null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
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
    message:{
        color:"green",
        textAlign:"center",
        textTransform:"capitalize",
        letterSpacing:2,
        fontSize:13,
        marginTop:10,
    }
});

export default ShowDetaisCandidate;