import EntitiesList from "Components/EntitiesList";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./src/Components/Login";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Login>
          <EntitiesList />
        </Login>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#FEE",
    backgroundColor: "#110",
    alignItems: "center",
    justifyContent: "center",
  },
});
