import React from "react"
import { Col, makeReactiveView, TextView } from "../shared/clients/views"

export default makeReactiveView(function HomeScreen() {
  return (
    <Col alignItems="center" justifyContent="center">
      <TextView Byline>Home Screen</TextView>
    </Col>
  )
})
