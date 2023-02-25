import React from "react"
import { Pressable } from "react-native"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"

import AppStore, { Screen } from "./src/data/AppStore"
import { Box, Col, FixRow, makeReactiveView, TextView } from "./src/shared/clients/views"

import AvailabilityScreen from "./src/screens/AvailabilityScreen"
import HomeScreen from "./src/screens/HomeScreen"
import TestScreen from "./src/screens/TestScreen"
import KitchenSink from "./src/shared/clients/views/KitchenSink"

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
    case "Availability":
      return <AvailabilityScreen />
    case "Kitchen Sink":
      return <KitchenSink />
  }
})

const NavBar = makeReactiveView(() => {
  return (
    <FixRow basis={60} alignSelf="center">
      <NavButton screen="Home" />
      <Box basis={10}></Box>
      <NavButton screen="Test" />
      <Box basis={10}></Box>
      <NavButton screen="Availability" />
      <Box basis={10}></Box>
      <NavButton screen="Kitchen Sink" />
    </FixRow>
  )
})

const NavButton = makeReactiveView((props: { screen: Screen }) => {
  return (
    <Pressable onPress={() => AppStore.navigateToScreen(props.screen)}>
      <TextView Beet={AppStore.screen === props.screen} Byline>
        {props.screen}
      </TextView>
    </Pressable>
  )
})
