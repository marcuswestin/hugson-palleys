import React from "react"
import API from "../data/API"
import { Button, Col, makeReactiveView } from "../shared/clients/views"

export default makeReactiveView(function HomeScreen() {
  return (
    <Col alignItems="center" justifyContent="center">
      <Button
        onPress={() => {
          API.setAvailability({ isAvailable: true })
        }}
      >
        I'm Available!
      </Button>
    </Col>
  )
})
