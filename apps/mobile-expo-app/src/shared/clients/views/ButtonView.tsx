import React, { PropsWithChildren } from "react"
import { Pressable } from "react-native"
import { TextView } from "./ThemeViews"

export const ButtonView = (props: PropsWithChildren<{ onPress: () => void }>) => {
  let children = React.Children.map(props.children, (child) => {
    if (typeof child === "string") {
      return <TextView Byline>{child}</TextView>
    } else {
      return child
    }
  })
  return (
    <Pressable style={{ backgroundColor: "red", padding: 10 }} onPress={props.onPress}>
      {children}
    </Pressable>
  )
}
