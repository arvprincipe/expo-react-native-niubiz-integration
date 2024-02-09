// create a custom hook to handle the async storage logic read, save and delete

import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const readData = async (key: string) => {
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setResponse(value);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (key: string, value: string) => {
    try {
      setLoading(true);
      await AsyncStorage.setItem(key, value);
      setResponse(value);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (key: string) => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem(key);
      setResponse("");
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, readData, saveData, deleteData };
}
