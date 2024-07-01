import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthFromStyle } from "../../auth/Style/Auth";
import { useDispatch, useSelector } from "react-redux";
import { createNewElectionAsync,selectcreateNewElectionData, updateMessageDataFromAdmin, updatecreateNewElectionData } from "./adminSlice";
import { useNavigation } from "@react-navigation/native";
const AddNewElection = () => {
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const data=useSelector(selectcreateNewElectionData)
  useEffect(()=>{
    dispatch(updateMessageDataFromAdmin(null));
  },[])
  // useEffect(()=>{
  //   if(data&&data.success){
  //   setTimeout(()=>{
  //       navigation.navigate("HomeContainer")
  //       dispatch(updatecreateNewElectionData(null))
  //     },2000)
  //   }
  // },[data])
  const styles = AuthFromStyle;

  const dateToNumber = (dateString) => {
    dateString = dateString.split("/").join("-");
    dateString = new Date(dateString);
    return dateString.getTime();
  };
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [candidateRegistrationDate, setCandidateRegistrationDate] = useState({
    stateDate: "",
    endDate: "",
  });
  const [voterRegistrationDate, setVoterRegistrationDate] = useState({
    stateDate: "",
    endDate: "",
  });
  const [votingDate, setVotingDate] = useState("");
  const [resultDate, setResultDate] = useState("");
  // const [startDate,setStartDate]
  const [datePress, setDatePress] = useState({
    cs: false,
    ce: false,
    vs: false,
    ve: false,
    vv: false,
    rr: false,
  });
  const today = Date.now();
  const [datePickeStartDate,setDatePickeStartDate]=useState(getFormatedDate(today, "YYYY/MM/DD"))
  const handleSetDatePicker=(inputDate)=>{
    if(inputDate){
      const currentDateInMilliseconds = dateToNumber(inputDate)
    const currentDate = new Date(currentDateInMilliseconds);
    currentDate.setDate(currentDate.getDate() + 1);
    const updatedDateInMilliseconds = currentDate.getTime();
    // console.log(updatedDateInMilliseconds); 
    setDatePickeStartDate(getFormatedDate(updatedDateInMilliseconds, "YYYY/MM/DD"))
    }
  }
  const handleToggleDate = (type) => {
    if(type=='ce'&&!candidateRegistrationDate.stateDate){
      alert("First, enter candidate the start Date")
      return;
    }
    if(type=='vs'&&!candidateRegistrationDate.endDate){
      alert("First, enter the start and end dates for the candidate registration period.")
      return;
    }
    if (type=='ve'&&!voterRegistrationDate.stateDate){
      alert("First, enter voter the start Date")
      return;
    }
    if(type=='vv'&&!voterRegistrationDate.endDate){
      alert("First, enter the start and end dates for the voter registration period.")
      return;
    }
    if(type=='rr'&&!votingDate){
      alert("First, enter the DateOfVoting")
      return;
    }
    if(type=='ce'){
      handleSetDatePicker(candidateRegistrationDate.stateDate)
    }else if(type=='vs'){
      handleSetDatePicker(candidateRegistrationDate.endDate)
    }
    else if(type=='ve'){
      handleSetDatePicker(voterRegistrationDate.stateDate)
    }else if(type=='vv'){
      handleSetDatePicker(voterRegistrationDate.endDate)
    }else if(type=='rr'){
      handleSetDatePicker(votingDate)
    }
    const press = {
      cs: false,
      ce: false,
      vs: false,
      ve: false,
      vv: false,
      rr: false,
    };
    setDatePress({ ...press, [type]: true });
    setShowDate(!showDate);
  };
  const handleSubmitData = () => {
    if (datePress.ce) {
      setCandidateRegistrationDate({
        ...candidateRegistrationDate,
        endDate: selectedStartDate,
      });
    } else if (datePress.cs) {
      setCandidateRegistrationDate({
        ...candidateRegistrationDate,
        stateDate: selectedStartDate,
      });
    } else if (datePress.ve) {
      setVoterRegistrationDate({
        ...voterRegistrationDate,
        endDate: selectedStartDate,
      });
    } else if (datePress.vs) {
      setVoterRegistrationDate({
        ...voterRegistrationDate,
        stateDate: selectedStartDate,
      });
    } else if (datePress.vv) {
      setVotingDate(selectedStartDate);
    } else if (datePress.rr) {
      setResultDate(selectedStartDate);
    }
    const press = {
      cs: false,
      ce: false,
      vs: false,
      ve: false,
      vv: false,
      rr: false,
    };
    setDatePress(press);
    setShowDate(!showDate);
  };
  const [electionName, setElectionName] = useState("");
  const [electionDesctiption, setElectionDesctiption] = useState("");
  const [electionType, setElectionType] = useState("");
  const [errorAction, setErrorAction] = useState(false);
  const errorText = {
    electionName: "Enter Elecitonname",
    electionType: "Enter ElectionType",
    electionDesctiption: "Enter election Desctiption",
    startDate: "Enter start date",
    endDate: "Enter end date",
    votingDate: "Enter Voting Date",
    resultDate: "Enter ResultData",
  };
 
  const handleCreate = () => {
    setErrorAction(true);
    if (
      electionName &&
      electionDesctiption &&
      electionType &&
      candidateRegistrationDate.endDate &&
      candidateRegistrationDate.endDate &&
      voterRegistrationDate.stateDate &&
      voterRegistrationDate.endDate &&
      votingDate &&
      resultDate
    ) {
      const data = {
        name: electionName,
        description: electionDesctiption,
        type: electionType,
        periodOfTimeCandidateRegistration: {
          startTime: dateToNumber(voterRegistrationDate.stateDate),
          endTime: dateToNumber(voterRegistrationDate.endDate),
        },
        periodOfTimeVoterRegistration: {
          startTime: dateToNumber(candidateRegistrationDate.stateDate),
          endTime: dateToNumber(candidateRegistrationDate.endDate),
        },
        dateOfVotiong: dateToNumber(votingDate),
        resultDate: dateToNumber(resultDate),
      };
      // console.log(data)
      dispatch(createNewElectionAsync(data))
    } else {
      alert("fill all date");
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.Card}>
          <View style={styles.inputCard}>
            <View style={styles.inputItem}>
              <MaterialCommunityIcons
                name="format-letter-case"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                value={electionName}
                onChangeText={setElectionName}
                placeholder="Election Name"
              />
              <Text style={styles.error}>
                {!electionName && errorAction ? errorText.electionName : ""}
              </Text>
            </View>
            <View style={styles.inputItem}>
              <MaterialCommunityIcons
                name="format-letter-ends-with"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                placeholder="Election Type"
                value={electionType}
                onChangeText={setElectionType}
              />
              <Text style={styles.error}>
                {!electionType && errorAction ? errorText.electionType : ""}
              </Text>
            </View>
            <View style={styles.inputItem}>
              <MaterialCommunityIcons
                name="format-letter-case-lower"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                placeholder="Election Description"
                multiline
                value={electionDesctiption}
                onChangeText={setElectionDesctiption}
              />
              <Text style={styles.error}>
                {!electionDesctiption && errorAction
                  ? errorText.electionDesctiption
                  : ""}
              </Text>
            </View>
            <Modal animationType="slide" visible={showDate} transparent={true}>
              <View style={innerStyle.centeredView}>
                <View style={innerStyle.modalView}>
                  <DatePicker
                    mode="calendar"
                    minimumDate={datePickeStartDate}
                    // selected={startedDate}
                    onSelectedChange={(date) => setSelectedStartDate(date)}
                    options={{
                      backgroundColor: "#14213d",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      textFontSize: 12,
                      textHeaderFontSize: 15,
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />
                  <Pressable
                    onPress={() => handleSubmitData()}
                    style={innerStyle.selectCard}
                  >
                    <MaterialIcons name="done" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
            </Modal>
            <View style={innerStyle.DateContainer}>
              <Text style={innerStyle.DateInfo}>Period Of candidate Registeration Date</Text>
              <View style={innerStyle.periodOfTimeCandidate}>
                <Pressable
                  onPress={() => handleToggleDate("cs")}
                  style={innerStyle.dateCard}
                >
                  <Text style={innerStyle.date}>
                    Start Date : {candidateRegistrationDate.stateDate}
                  </Text>
                  <Text style={innerStyle.error}>
                    {!candidateRegistrationDate.stateDate && errorAction
                      ? errorText.startDate
                      : ""}
                  </Text>
                </Pressable>
                <Pressable
                  style={innerStyle.dateCard}
                  onPress={() => handleToggleDate("ce")}
                >
                  <Text style={innerStyle.date}>
                    End Date : {candidateRegistrationDate.endDate}
                  </Text>
                  <Text style={innerStyle.error}>
                    {!candidateRegistrationDate.endDate && errorAction
                      ? errorText.endDate
                      : ""}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={innerStyle.DateContainer}>
              <Text style={innerStyle.DateInfo}>Period Of Voter Registeration Date</Text>
              <View style={innerStyle.periodOfTimeCandidate}>
                <Pressable
                  onPress={() => handleToggleDate("vs")}
                  style={innerStyle.dateCard}
                >
                  <Text style={innerStyle.date}>
                    Start Date : {voterRegistrationDate.stateDate}
                  </Text>
                  <Text style={innerStyle.error}>
                    {!voterRegistrationDate.stateDate && errorAction
                      ? errorText.startDate
                      : ""}
                  </Text>
                </Pressable>
                <Pressable
                  style={innerStyle.dateCard}
                  onPress={() => handleToggleDate("ve")}
                >
                  <Text style={innerStyle.date}>
                    End Date : {voterRegistrationDate.endDate}
                  </Text>
                  <Text style={innerStyle.error}>
                    {!voterRegistrationDate.endDate && errorAction
                      ? errorText.endDate
                      : ""}
                  </Text>
                </Pressable>
              </View>
            </View>
            <Pressable
              onPress={() => handleToggleDate("vv")}
              style={innerStyle.VotingDateCard}
            >
              <Text style={innerStyle.date}>DateOfVoting:</Text>
              <Text style={innerStyle.date}>{votingDate}</Text>
            <Text style={innerStyle.error}>
              {!votingDate && errorAction ? errorText.votingDate : ""}
            </Text>
            </Pressable>
            <Pressable
              onPress={() => handleToggleDate("rr")}
              style={innerStyle.VotingDateCard}
            >
              <Text style={innerStyle.date}>DateOfResult:</Text>
              <Text style={innerStyle.date}>{resultDate}</Text>
            <Text style={innerStyle.error}>
              {!resultDate && errorAction ? errorText.resultDate : ""}
            </Text>
            </Pressable>
          </View>
        </View>
        <View style={{marginHorizontal:16}}>

        <Button onPress={() => handleCreate()} title="Create" />
        </View>
        <Text style={innerStyle.message}>{data&&data.message?data.message:''}</Text>
      </ScrollView>
    </View>
  );
};

export default AddNewElection;

const innerStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#14213d",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  selectCard: {
    position: "absolute",
    bottom: 8,
    right: 10,
    backgroundColor: "#fca311",
    padding: 8,
    borderRadius: 99,
  },
  select: {
    color: "black",
  },
  dateCard: {
    backgroundColor:"#FAF9F6",
    flex: 1,
    marginHorizontal: 5,
    height:44,
    elevation:10,
    borderRadius:10,

  },
  periodOfTimeCandidate: {
    // marginVertical:10,
    flexDirection: "row",
    // backgroundColor:"red",
    // justifyContent:"space-between"
  },
  DateContainer: {
    marginTop: 10,
  },
  date: {
    // backgroundColor:"balck"
    // borderWidth: 1,
    paddingTop:12,
    paddingLeft:6,
    // padding: 10,
    // width:"40%",
  },
  dateModel: {
    position: "absolute",
    top: "100",
  },
  VotingDateCard: {
    flexDirection:"row",
    height:44,
    marginTop:20,
    backgroundColor:"#FAF9F6",
    borderRadius:10,
    elevation:10,
    // marginHorizontal:5,
  },
  error: {
    color: "red",
    position:"absolute",
    right:10,
    top:15,
    fontSize:10

  },
  DateInfo:{
    textTransform:"capitalize",
    letterSpacing:2,
    fontSize:13,
    marginBottom:10,
    marginLeft:5,
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