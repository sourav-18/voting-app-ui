import VoterSignUp from './features/auth/components/VoterSignUp'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './HomeTab'
import CandidateSignUp from './features/auth/components/CandidateSignUp'
import VoterUpcomeingElection from './features/home/voterComponents/VoterUpcomeingElection'
const Stack = createNativeStackNavigator();
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SignIn from './features/auth/components/SignIn'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectSignInCandidate, selectSignInVoter, setsignInCandidateData, setsignInVoterData } from './features/auth/authSlice';
import Leanding from './features/LendingPage/Leanding';
import AdminSignIn from './features/auth/components/AdminSignIn';
import { selectAdminToken } from './features/home/adminProfile/adminSlice';
import VoterRegisterElection from './features/home/voterComponents/VoterRegisterElection';
import CandidateCurrentElection from './features/home/candidateProfile/CandidateCurrentElection';
import CandiadateRegisterElection from './features/home/candidateProfile/CandiadateRegisterElection';
import AddNewElection from './features/home/adminProfile/AddNewElection';
import GotoRegisterElection from './features/home/voterComponents/GotoRegisterElection';
import GoToRegisterElectionCandidate from './features/home/candidateProfile/GoToRegisterElectionCandidate';
import TodayVote from './features/home/voterComponents/TodayVote';
import SubmitVote from './features/home/voterComponents/SubmitVote';
import TodayRstultElection from './features/home/adminProfile/TodayRstultElection';
import CalculateResult from './features/home/adminProfile/CalculateResult';
import Test from './features/Charts/Test';
import ShowAllResultElection from './features/home/adminProfile/ShowAllResultElection';
import Result from './features/home/adminProfile/Result';
import AllElection from './features/home/adminProfile/AllElection';
import Election from './features/home/adminProfile/Election';
import LiveResult from './features/home/candidateProfile/LiveResult';
import UnattemptedVote from './features/home/voterComponents/UnattemptedVote';
import WinElection from './features/home/candidateProfile/WinElection';
import ShowDetaisCandidate from './features/home/candidateProfile/ShowDetaisCandidate';
import ShowElectionDetailsByVoter from './features/home/voterComponents/ShowElectionDetailsByVoter';
import EditEleciton from './features/home/adminProfile/EditEleciton';
import ShowEditedElection from './features/home/adminProfile/ShowEditedElection';

const MainApp = () => {
    const dispatch=useDispatch();
    const signInVoterData=useSelector(selectSignInVoter)
    const signInCandidateData=useSelector(selectSignInCandidate)
    const adminToken=useSelector(selectAdminToken)
    console.log()
    useEffect(()=>{
      const setRoute=async()=>{
        const data=await AsyncStorage.getItem("currentLogin")
        if(data==='voter'){
          const data=await AsyncStorage.getItem("jwt_token")
          if(data)dispatch(setsignInVoterData(data));
        }else if(data=='candidate'){
          const data=await AsyncStorage.getItem("jwt_token")
          if(data)dispatch(setsignInCandidateData(data));
        }
      }
        setRoute();
    },[])
    // console.log(adminToken)
    const currentScreen=signInVoterData||signInCandidateData?"HomeContainer":"LoginTo..."
    // console.log({signInVoterData,signInCandidateData})
  return (
    <NavigationContainer key={signInVoterData||signInCandidateData} >
      <Stack.Navigator initialRouteName={currentScreen} > 
<Stack.Screen name="LoginTo..." component={Leanding} />
<Stack.Screen name="Votersignup" component={VoterSignUp} />
<Stack.Screen name="Candidatesignup" component={CandidateSignUp} />
<Stack.Screen name="Signin" component={SignIn} options={({ route }) => ({ title: route.params.signInType })}/>
<Stack.Screen name="VoterUpcomeingElection" component={VoterUpcomeingElection} />
<Stack.Screen name="CandidateCurrentElection" component={CandidateCurrentElection} />
<Stack.Screen name="CandiadateRegisterElection" component={CandiadateRegisterElection} />
<Stack.Screen name="VoterRegisterElection" component={VoterRegisterElection} />
<Stack.Screen name="AdminSignIn" component={AdminSignIn} />
<Stack.Screen name="AddNewElection" component={AddNewElection} />
<Stack.Screen name="GotoRegisterElectionVoter" component={GotoRegisterElection} />
<Stack.Screen name="GotoRegisterElectionCandidate" component={GoToRegisterElectionCandidate} /> 
<Stack.Screen name="TodayVote" component={TodayVote} /> 
<Stack.Screen name="showElectionDetaisByCandidate" component={ShowDetaisCandidate} /> 
<Stack.Screen name="showElectionDetaisByVoter" component={ShowElectionDetailsByVoter} /> 
<Stack.Screen name="SubmitVote" component={SubmitVote} /> 
<Stack.Screen name="EditElectin" component={EditEleciton} /> 
<Stack.Screen name="ShowEditedElection" component={ShowEditedElection} /> 
<Stack.Screen name="TodayRstultElection" component={TodayRstultElection} /> 
<Stack.Screen name="Test" component={Test} /> 
<Stack.Screen name="CalculateResult" component={CalculateResult} /> 
<Stack.Screen name="AllElectionResult" component={ShowAllResultElection} /> 
<Stack.Screen name="Result" component={Result} /> 
<Stack.Screen name="AllElection" component={AllElection} /> 
<Stack.Screen name="Election" component={Election} /> 
<Stack.Screen name="LiveResult" component={LiveResult} /> 
<Stack.Screen name="UnAttemptedVoter" component={UnattemptedVote} /> 
<Stack.Screen name="WinElection" component={WinElection} /> 
<Stack.Screen name="HomeContainer" component={HomeTab} options={{headerShown:false}}/>
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default MainApp

const styles = StyleSheet.create({})