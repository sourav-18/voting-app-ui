import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Modal,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState } from "react";
  import DatePicker from "react-native-modern-datepicker";
  import { getFormatedDate } from "react-native-modern-datepicker";
  import { Button } from "react-native";
  
  export default function App() {
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
      today.setDate(today.getDate() + 1),
      "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("12/12/2023");
    function handleChangeStartDate(propDate) {
      setStartedDate(propDate);
    }
  
    const handleOnPressStartDate = () => {
      setOpenStartDatePicker(!openStartDatePicker);
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.textHeader}>Telegram</Text>
            <Text style={styles.textSubHeader}>Date Picker in Expo</Text>
  
            <Button title="press" onPress={()=>handleOnPressStartDate()}/>
  
            {/* Create modal for date picker */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={openStartDatePicker}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    mode="calendar"
                    minimumDate={startDate}
                    selected={startedDate}
                    onDateChanged={handleChangeStartDate}
                    onSelectedChange={(date) => setSelectedStartDate(date)}
                    options={{
                      backgroundColor: "#48cae4",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />
  
                  <TouchableOpacity onPress={handleOnPressStartDate}>
                    <Text style={{ color: "white" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    textHeader: {
      fontSize: 36,
      marginVertical: 60,
      color: "#111",
    },
    textSubHeader: {
      fontSize: 25,
      color: "#111",
    },
    inputBtn: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "#222",
      height: 50,
      paddingLeft: 8,
      fontSize: 18,
      justifyContent: "center",
      marginTop: 14,
    },
    submitBtn: {
      backgroundColor: "#342342",
      paddingVertical: 22,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingVertical: 12,
      marginVertical: 16,
    },
    centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "#080516",
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
  });