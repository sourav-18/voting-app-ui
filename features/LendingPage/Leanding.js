import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation();

  const handleGotoVoterLogin=()=>{
    navigation.navigate("Signin",{signInType:"voter",from:"Votersignup"})
}
const handleGotoCandidateLogin=()=>{
       navigation.navigate("Signin",{signInType:"candidate",from:"Candidatesignup"})
       
    }
    const handleGotoAdminLogin=()=>{
       navigation.navigate("AdminSignIn")

    }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Online Voting!</Text>
        <Text style={styles.subtitle}>Choose an option to get started:</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3498db' }]}
          onPress={() =>handleGotoVoterLogin()}
        >
          <Text style={styles.buttonText}>Login with Voter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2ecc71' }]}
          onPress={() =>handleGotoAdminLogin()}
        >
          <Text style={styles.buttonText}>Login with Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#9b59b6' }]}
          onPress={() =>handleGotoCandidateLogin()}
        >
          <Text style={styles.buttonText}>Login with Candidate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Landing;
