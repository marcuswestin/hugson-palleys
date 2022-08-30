import React from "react"
import { Button } from "react-native"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"

import AppStore from "./src/data/AppStore"
import HomeScreen from "./src/screens/HomeScreen"
import TestScreen from "./src/screens/TestScreen"
import { Col, makeReactiveView, Row } from "./src/shared/clients/views"

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
    <Row alignSelf="center">
      <Button onPress={AppStore.navigateHome} title="Home" />
      <Button onPress={AppStore.navigateTest} title="Test" />
    </Row>
  )
})
