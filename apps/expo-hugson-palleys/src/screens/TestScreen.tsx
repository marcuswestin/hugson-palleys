import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx any time to start working on your app!</Text>
      <Button
        title="Press me"
        onPress={async () => {
          let res = await fetch("http://localhost:8080");
          let bodyText = await res.text();
          alert(bodyText);
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
