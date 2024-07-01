import { Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Top = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.containner}>
      <Pressable style={styles.card} onPress={()=>navigation.navigate("CandidateCurrentElection")}>
        <Octicons style={styles.icon}name="broadcast" size={24} color="white" />
        <Text style={styles.text}>Upcoming Voting</Text>
      </Pressable>
      <Pressable style={styles.card} onPress={()=>navigation.navigate("LiveResult")}>
      <Octicons style={styles.icon} name="checklist" size={24} color="white" />
        <Text style={styles.text}>Voting Result</Text>
      </Pressable>
    </View>
  );
};

export default Top;

const styles = StyleSheet.create({
  containner: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent:"center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#bbd0ff",
    elevation: 10,
    width:"48%",
    height:100,
    borderRadius:5,
    marginHorizontal:10,
    // borderColor:"gray",
    // borderWidth:2,
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
    textAlign:"center",
    marginTop:11
  },
  icon:{
    backgroundColor:"#1b263b",
    padding:10,
    borderRadius:99,
    alignSelf:"center",
    marginTop:12
  }
});
