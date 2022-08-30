import { makeLibUIView } from "../lib-ui/lib-ui"
export { makeReactiveView } from "../lib-ui/lib-ui"

export const colors = {
  "Light": "#FDFAF7",
  "Dark": "#210C55",
  "Pink": "#FF5981",
  "Beet": "#FF5981",
  "Mint": "#E7FCF9",
}

export const themes = {
  standard: {
    colors: colors,
    spaces: { "10h": 10, "15h": 15, "20h": 20, "30h": 30 },
    defaultTextColor: "Dark",
    fonts: {
      Header: { fontFamily: "Menlo", fontSize: 100, lineHeight: 120 },
      Byline: { fontFamily: "Menlo", fontSize: 18, lineHeight: 23.75, textTransform: "uppercase" },
      Body: { fontFamily: "Helvetica Neue", fontSize: 18, lineHeight: 26 },
    },
  },
} as const

export const { Box, Col, Row, FixCol, FixRow, TextView, getSpaceValue } = makeLibUIView(
  themes.standard
)
