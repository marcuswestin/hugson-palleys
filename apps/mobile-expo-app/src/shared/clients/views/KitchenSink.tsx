import React, { useState } from "react"
import { Button, Col, makeReactiveView, ScrollView, TextView } from "./ThemeViews"

export default makeReactiveView(function KitchenSink() {
  return (
    <ScrollView>
      <ButtonSection />
    </ScrollView>
  )
})

function ButtonSection() {
  let [count, setCount] = useState(0)
  return (
    <Col>
      <TextView SectionTitle>Button</TextView>
      <Button
        title={`Count: ${count}`}
        alignSelf="center"
        p={[20, 40]}
        background="red"
        onPress={() => {
          setCount(count + 1)
        }}
      >
        <TextView Byline> Count {count}</TextView>
      </Button>
    </Col>
  )
}
