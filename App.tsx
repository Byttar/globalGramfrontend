import axios from "axios";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Routes from "./src/routes";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import theme from "./src/theme/colors";

axios.defaults.baseURL = "https://fatec-globalgram.herokuapp.com/";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_700Bold",
            color: "white",
          }}
        >
          GlobalGram
        </Text>
      </View>
      <StatusBar backgroundColor={theme.lightTheme.primary} />
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    backgroundColor: theme.lightTheme.primary,
  },
});
