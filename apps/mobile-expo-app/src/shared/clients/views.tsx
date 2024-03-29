export { makeReactiveView } from "./lib-ui/lib-ui"
export { ButtonView as Button } from "./views/ButtonView"
export * from "./views/ThemeViews"

// shared-themes.ts - this usually goes in its own file, and is shared across multiple apps
///////////////////////////////////////////////////////////////////////////////////////////

//
// shared-views.ts - this usually goes in its own file, and is shared across multiple apps
//////////////////////////////////////////////////////

// importGoogleWebFont("JetBrains Mono", ["400italic", "400", "600"])
// importGoogleWebFont("Jost", ["400italic", "400"])

// const initialViews = makeViews(getAppropriateTheme())

// type ResponsiveViewsCallback = (views: typeof initialViews) => void
// getResponsiveThemedViews.callback = null as ResponsiveViewsCallback | null
// /* export */ function getResponsiveThemedViews(
//   callback: ResponsiveViewsCallback
// ): typeof initialViews {
//   if (getResponsiveThemedViews.callback) {
//     throw new Error("getResponsiveThemedViews called twice")
//   }
//   getResponsiveThemedViews.callback = callback
//   return initialViews
// }

// // useResponsiveThemes ensures that the appropriate Box, Col, Row, Grid, TextView, and getSpaceValue are set.
// /* export */ function useResponsiveThemes() {
//   trackWindowSize(getAppropriateTheme, function () {
//     let views = makeViews(getAppropriateTheme())
//     getResponsiveThemedViews.callback!(views)
//   })
// }

// // useIsSmallWindow returns true if the current window size is small
// /* export */ function useIsSmallWindow() {
//   let theme = trackWindowSize(getAppropriateTheme)
//   return theme === themes.small
// }

// // getAppropriateTheme returns the appropriate theme given the current window size
// function getAppropriateTheme() {
//   let isSmall = RN.Dimensions.get("window").width < 870
//   return isSmall ? themes.small : themes.standard
// }

//
// ExampleApp-views.tsx - this usually goeas in its own file, and belongs to a single app
/////////////////////////////////////////////////////////////////////////////////////////

// export * from 'path/to/shared-views'

// /* export */ let { Box, Col, Row, Grid, TextView, getSpaceValue } = getResponsiveThemedViews(
//   (views) => {
//     ;({ Box, Col, Row, Grid, TextView, getSpaceValue } = views)
//   }
// )

// //
// // ExampleApp.tsx - this usually goes in its own file
// /////////////////////////////////////////////////////

// export let ExampleApp = makeReactiveView(() => {
//   useResponsiveThemes()
//   let isSmallWindow = useIsSmallWindow()
//   console.log("reactive val for 10h", getSpaceValue("10h"), "is small window", isSmallWindow)

//   return (
//     <Col p={["10v", "20h"]}>
//       <Row />
//       <Grid />
//       <Box />
//       <TextView Header Pink>
//         Test
//       </TextView>
//     </Col>
//   )
// })
