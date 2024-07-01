import AsyncStorage from '@react-native-async-storage/async-storage'
export const _storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
      // console.log("from localstroge->",{key,value})
    } catch (error) {
      console.log("error from _storeData")
    }
  };
export const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch (error) {
      console.log("error from _retrieveData ")
    }
  };