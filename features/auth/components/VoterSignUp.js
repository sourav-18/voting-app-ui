import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { AuthFromStyle } from "../Style/Auth";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignUpVoter,
  setsignInCandidateData,
  setsignInVoterData,
  signUpVoterAsync,
} from "../authSlice";
import { Ionicons } from "@expo/vector-icons";

const VoterSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const styles = AuthFromStyle;
  const [aadharNumber, setAadharNumber] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorAction, setErrorAction] = useState(false);
  const signupVoterData = useSelector(selectSignUpVoter);
  const errorText = {
    aadharNumber: "fill aadharnumber",
    name: "fill name",
    email: "fill email",
    phoneNumber: "fill phonnumber",
    password: "fill password",
  };
  const handleSignUp = () => {
    setErrorAction(true);
    if (email && password && name && phoneNumber && aadharNumber) {
      dispatch(
        signUpVoterAsync({ name:name.trim(), password:password.trim(), aadharNumber:aadharNumber.trim(), phoneNumber:phoneNumber.trim(), email:email.trim() })
      );
    }
  };
  useEffect(() => {
    if (signupVoterData?.success) {
      setName(""),
        setAadharNumber(""),
        setEmail(""),
        setPassword(""),
        setPhoneNumber(""); //clear date after successfuly signUp
      dispatch(setsignInVoterData(null));
      dispatch(setsignInCandidateData(null));
      setErrorAction(false);
      navigation.navigate("Signin", {
        signInType: "Voter",
        from: "Votersignup",
      });
    }
  }, [signupVoterData]);

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: 30 }]}
      behavior="height"
    >
      <View style={styles.titleCard}>
        <Text style={styles.title}>Almost There !</Text>
        <Text style={styles.smallTitle}>Sign Up to Continue...</Text>
      </View>
      <ScrollView>
        <View style={styles.Card}>
          <View style={styles.inputCard}>
            <View style={styles.inputItem}>
              <MaterialCommunityIcons
                name="order-numeric-ascending"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                value={aadharNumber}
                onChangeText={setAadharNumber}
                placeholder="Aadharnumber"
              />
              <Text style={styles.error}>
                {!aadharNumber && errorAction ? errorText.aadharNumber : ""}
              </Text>
            </View>

            <View style={styles.inputItem}>
              <Ionicons name="text-outline" size={24} color="black" />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Name"
              />
              <Text style={styles.error}>
                {!name && errorAction ? errorText.name : ""}
              </Text>
            </View>
            <View style={styles.inputItem}>
              <MaterialCommunityIcons
                name="email-fast-outline"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
              />
              <Text style={styles.error}>
                {!email && errorAction ? errorText.email : ""}
              </Text>
            </View>
            <View style={styles.inputItem}>
              <Ionicons name="call-outline" size={24} color="black" />
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter Phonenumber"
              />
              <Text style={styles.error}>
                {!email && errorAction ? errorText.email : ""}
              </Text>
            </View>
            <View style={styles.inputItem}>
              <AntDesign name="unlock" size={24} color="black" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
              />
              <Text style={styles.error}>
                {!password && errorAction ? errorText.password : ""}
              </Text>
            </View>
          </View>
          <View style={styles.btn}>
            {/* <Pressable><Text style={styles.btnText}>SIGN IN</Text></Pressable> */}
            <Button onPress={() => handleSignUp()} title="SIGN UP" />
          </View>
          <View style={styles.foterItem}>
            <Text style={styles.foterTextFirst}>Don,t have an a account?</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Signin", {
                  signInType: "voter",
                  from: "Votersignup",
                })
              }
            >
              <Text style={styles.foterTextLast}>SIGN In..!</Text>
            </Pressable>
          </View>
          <Text>{signupVoterData?.message}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoterSignUp;

const styles = StyleSheet.create({});
