import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VoterHomePage from "./features/home/voterComponents/VoterHomePage";
import { AntDesign } from "@expo/vector-icons";
import VoterProfile from "./features/home/voterComponents/VoterProfile";
import { Feather } from "@expo/vector-icons";
import { _retrieveData } from "./localStorage";
import CandidateHomePage from "./features/home/candidateProfile/CandidateHomePage";
import CandidateProfile from "./features/home/candidateProfile/CandidateProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminHomePage from "./features/home/adminProfile/AdminHomePage";
import AdminProfile from "./features/home/adminProfile/AdminProfile";
import Emty from "./Emty";
const Tab = createBottomTabNavigator();
const HomeTab = () => {
  const [currentLogin, setCurrentLogin] = useState(null);
  useEffect(() => {
    const getDate = async () => {
      const data = await _retrieveData("currentLogin");
      setCurrentLogin(data);
    };
    getDate();
  }, []);
  // const ik=async()=>{
  //   await AsyncStorage.removeItem("jwt_token")
  // }
  // ik()
  // console.log(currentLogin);
  let homePage = Emty;
  let ProfilePage = Emty;
  if (currentLogin === "voter") {
    homePage = VoterHomePage;
    ProfilePage = VoterProfile;
  } else if (currentLogin === "candidate") {
    homePage = CandidateHomePage;
    ProfilePage = CandidateProfile;
  } else if (currentLogin == "admin") {
    homePage = AdminHomePage;
    ProfilePage = AdminProfile;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 5,
          backgroundColor: "#f7fff7",
          height: 55,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="home" size={24} color="black" />;
          },
        }}
        name="Home"
        component={homePage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" size={24} color="black" />;
          },
        }}
        name="Profile"
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
