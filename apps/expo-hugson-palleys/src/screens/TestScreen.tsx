import { StatusBar } from "expo-status-bar"
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { TestAPI } from "../shared/universal/apis/api-specs"
import { makeAPIClient } from "../shared/universal/apis/lib-api/lib-api-specification"

const client = makeAPIClient(TestAPI)

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx any time to start working on your app!</Text>
      <Button
        title="Ping server"
        onPress={async () => {
          let res = await client.ping({ message: "hi there" })
          alert(res.message)
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
