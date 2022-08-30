import React from "react"
import { Pressable } from "react-native"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"

import AppStore from "./src/data/AppStore"
import { Box, Col, FixRow, makeReactiveView, TextView } from "./src/shared/clients/views"

import HomeScreen from "./src/screens/HomeScreen"
import TestScreen from "./src/screens/TestScreen"

export default function App() {
  return (
    <SafeAreaProvider>
      <ContentView />
    </SafeAreaProvider>
  )
}

function ContentView() {
  let safeArea = useSafeAreaInsets()
  return (
    <Col m={[safeArea.top, safeArea.right, safeArea.bottom, safeArea.left]}>
      <ScreenView />
      <NavBar />
    </Col>
  )
}

const ScreenView = makeReactiveView(() => {
  switch (AppStore.screen) {
    case "Home":
      return <HomeScreen />
    case "Test":
      return <TestScreen />
  }
})

const NavBar = makeReactiveView(() => {
  return (
    <FixRow basis={60} alignSelf="center">
      <Pressable onPress={AppStore.navigateHome}>
        <TextView Beet={AppStore.screen === "Home"} Byline>
          Home
        </TextView>
      </Pressable>
      <Box basis={20}></Box>
      <Pressable onPress={AppStore.navigateTest}>
        <TextView Beet={AppStore.screen === "Test"} Byline>
          Test
        </TextView>
      </Pressable>
    </FixRow>
  )
})
