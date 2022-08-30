import React, { PropsWithChildren } from "react"
import * as RN from "react-native"
import { StyleSheet, ViewProps } from "react-native"

// Pass through exports

import { observer } from "mobx-react-lite"

export let makeReactiveView = observer

// Never enforce mobx actions, since we frequently use async functions
// with state manipulations after calls to `await` (which otherwise)
// raise a warning from mobx, even though everything works as expected.
// configure({ enforceActions: "never" })

const NativeView = RN.View

//
// Default layout views
///////////////////////

export function makeLibUIView<Theme extends ThemesI>(theme: Theme) {
  return {
    TextView: makeTextView(theme),

    Box: makeBoxView(theme, NativeView),

    Row: makeBoxView(theme, NativeView, {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      flexGrow: 1,
      flexShrink: 1,
    }),

    Col: makeBoxView(theme, NativeView, {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      flexGrow: 1,
      flexShrink: 1,
    }),

    FixRow: makeBoxView(theme, NativeView, {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 40,
    }),

    FixCol: makeBoxView(theme, NativeView, {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 40,
    }),

    WrapRow: makeBoxView(theme, NativeView, {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      flexGrow: 1,
      flexShrink: 1,
    }),

    WrapCol: makeBoxView(theme, NativeView, {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "wrap",
      flexShrink: 1,
    }),

    getSpaceValue(key: keyof SpacesI) {
      return theme.spaces[key]
    },
  }
}

//
// ListView
//
// Our ListView takes two arguments in renderItem, as opposed to a single one.
// This allows for naming the item variable, resulting in much more ergonomic code, e.g
//   `<Text>card.title</Text>` vs `<Text>item.data.title</Text>`
////////////////////////////////////////////////////////////////

type OurRenderItem<ItemT> = (item: ItemT, info: OurRenderInfo) => React.ReactElement | null
type OurRenderInfo = { index: number; isFirst: boolean; isLast: boolean }
type ListViewProps<ItemT> = { renderItem: OurRenderItem<ItemT> } & Omit<
  RN.FlatListProps<ItemT>,
  "renderItem"
>
export let List = function <ItemT = any>(props: ListViewProps<ItemT>) {
  props = _makeWritableCopy(props)
  if (!props.keyExtractor) {
    props.keyExtractor = (_, index) => index.toString()
  }
  let flatListProps = Object.assign({}, props, {
    renderItem: (info: RN.ListRenderItemInfo<ItemT>) => {
      let ourRenderInfo = {
        index: info.index,
        isFirst: info.index === 0,
        isLast: info.index === props.data!.length - 1,
      }
      return props.renderItem(info.item, ourRenderInfo)
    },
  }) as RN.FlatListProps<ItemT>
  return <RN.FlatList {...flatListProps} />
}

// SVG Views
////////////

export function makeSVGView<Theme extends ThemesI>(theme: Theme, xml: string): BoxViewFn<Theme> {
  return function (props: ThemedBoxProps<Theme>) {
    let styles = _getStylesForBoxProps(theme, props)

    // SVG needs to be rendered differently on web than on native. Use inline data
    // encoding for web, and a conditional import of react-native-svg for native.
    switch (RN.Platform.OS) {
      case "web":
        return (
          <img
            style={styles as React.CSSProperties}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(xml)}`}
          />
        )
      default:
        // import react-native-svg only for native env
        let SvgXml = require("react-native-svg").SvgXml
        return <SvgXml style={styles} xml={xml} />
    }
  }
}

//
// Box & flex views
///////////////////

type BoxViewFn<Theme extends ThemesI> = (props: ThemedBoxProps<Theme>) => React.ReactElement
// export
function makeBoxView<ViewTypeProps extends ViewProps, Theme extends ThemesI>(
  theme: Theme,
  ViewType: React.ComponentClass<ViewTypeProps>,
  defaultStyles?: RN.ViewStyle
): BoxViewFn<Theme> {
  let stylesheetVal = defaultStyles
    ? StyleSheet.create({ styles: defaultStyles }).styles
    : undefined
  return function (props: PropsWithChildren<ThemedBoxProps<Theme>>) {
    props = _makeWritableCopy(props)
    if (stylesheetVal && props.style) {
      props.style = [stylesheetVal, props.style]
    } else if (stylesheetVal) {
      props.style = stylesheetVal
    }

    props = _processBoxProps(theme, props)

    let viewProps = props as unknown as ViewTypeProps
    return React.createElement(ViewType, viewProps, props.children)
  }
}

type AllTextFontProperties<Theme extends ThemesI> = Record<keyof Theme["fonts"], boolean>
type TextFontProperty<Theme extends ThemesI> = RequireExactlyOne<AllTextFontProperties<Theme>>
type TextViewProps<Theme extends ThemesI> = RN.TextProps &
  TextFontProperty<Theme> &
  ColorProps<Theme>
type TextViewFn<Theme extends ThemesI> = (props: TextViewProps<Theme>) => React.ReactElement
// export
function makeTextView<Theme extends ThemesI>(theme: Theme): TextViewFn<Theme> {
  let fontStylesheets = RN.StyleSheet.create(theme.fonts)
  let colorsStylesheets = RN.StyleSheet.create(_getThemeFontColorStyles(theme))

  function _getTextViewStylesheets(props: TextViewProps<Theme>) {
    let colorStylesheet: any
    let fontStylesheet: any

    for (const key of Object.keys(props)) {
      if (!colorStylesheet && props[key] && colorsStylesheets[key]) {
        colorStylesheet = colorsStylesheets[key]
      }

      if (!fontStylesheet && props[key] && fontStylesheets[key]) {
        fontStylesheet = fontStylesheets[key]
      }
    }

    if (!colorStylesheet) {
      colorStylesheet = colorsStylesheets[theme.defaultTextColor]
    }

    return [colorStylesheet, fontStylesheet]
  }

  return (props: TextViewProps<Theme>) => {
    props = _makeWritableCopy(props)

    let stylesheets = _getTextViewStylesheets(props)
    props.style = [props.style, stylesheets]

    return <RN.Text {...props}>{props.children}</RN.Text>
  }
}

function _getThemeFontColorStyles<Theme extends ThemesI>(theme: Theme) {
  let colorStyles: any = {}
  for (let key of Object.keys(theme.colors)) {
    colorStyles[key] = { color: theme.colors[key] }
  }
  return colorStyles
}

// Themed property types
////////////////////////

interface ThemesI extends Themes<ColorsI, SpacesI, FontsI> {}

type ThemedBoxProps<Theme extends ThemesI> = ViewProps &
  ColorProps<Theme> &
  SpaceProps<Theme> &
  BoxStyleAddonProps

type ColorsI = Record<string, string>
type SpacesI = Record<string, number | string>
type FontsI = Record<string, RN.TextStyle>

// export
type Themes<Colors extends ColorsI, Spaces extends SpacesI, Fonts extends FontsI> = {
  colors: Colors
  spaces: Spaces
  fonts: Fonts
  defaultTextColor: keyof Colors
}

// export
type UncheckedThemeBoxProps = ThemedBoxProps<UncheckedTheme>
type UncheckedTheme = ThemesI

type ColorsOfTheme<Theme extends ThemesI> = Theme["colors"]
type ColorKeysOfTheme<Theme extends ThemesI> = keyof ColorsOfTheme<Theme>

type SpacesOfTheme<Theme extends ThemesI> = Theme["spaces"]
type SpaceKeysOfTheme<Theme extends ThemesI> = keyof SpacesOfTheme<Theme>

type ColorProps<Theme extends ThemesI> = {
  [key in ColorKeysOfTheme<Theme>]?: boolean
}

type Dimension4<T> = T | [T, T] | [T, T, T] | [T, T, T, T]

type SpaceProps<Theme extends ThemesI> = {
  p?: Dimension4<SpaceKeysOfTheme<Theme> | number>
  m?: Dimension4<SpaceKeysOfTheme<Theme> | number>
}

// BoxView style addon props
////////////////////////////

type BoxSize = number | string

// TODO: Infer these from `const _transformers` below
interface BoxStyleAddonProps {
  background?: string
  h?: BoxSize
  w?: BoxSize
  maxW?: BoxSize
  minW?: BoxSize
  maxH?: BoxSize
  minH?: BoxSize
  gap?: BoxSize
  radius?: number | [number, number, number, number]
  alignItems?: RN.FlexStyle["alignItems"]
  alignSelf?: RN.FlexStyle["alignSelf"]
  alignContent?: RN.FlexStyle["alignContent"]
  justifyContent?: RN.FlexStyle["justifyContent"]
  grow?: RN.FlexStyle["flexGrow"]
  shrink?: RN.FlexStyle["flexShrink"]
  basis?: RN.FlexStyle["flexBasis"]
}

// Box property processing
//////////////////////////

function _processBoxProps<BoxProps extends ThemedBoxProps<Theme>, Theme extends ThemesI>(
  theme: Theme,
  props: BoxProps
): BoxProps {
  let boxPropStyles = _getStylesForBoxProps(theme, props)

  if (boxPropStyles) {
    props = _makeWritableCopy(props)
    props.style = [boxPropStyles, props.style]
  }

  return props
}

function _getStylesForBoxProps<BoxProps extends ThemedBoxProps<Theme>, Theme extends ThemesI>(
  theme: Theme,
  props: BoxProps
) {
  let boxPropStyles: RN.StyleProp<RN.ViewStyle> = {}
  let didSetStyle = false

  for (let [key, val] of Object.entries(props)) {
    if (key === "children") {
      continue
    }

    let color = (theme.colors as any)[key]
    if (color) {
      boxPropStyles.backgroundColor = color
      didSetStyle = true
      continue
    }

    let transformer = _transformers[key]
    if (transformer) {
      Object.assign(boxPropStyles, transformer(theme, val))
      didSetStyle = true
      continue
    }
  }

  return didSetStyle ? boxPropStyles : null
}

// Box property transformers
////////////////////////////

const _transformers: Record<string, Transformer> = {
  "p": _makeTransformer_Space1_4("padding"),
  "m": _makeTransformer_Space1_4("margin"),

  "h": _makeTransformer_default("height"),
  "w": _makeTransformer_default("width"),
  "maxW": _makeTransformer_default("maxWidth"),
  "minW": _makeTransformer_default("minWidth"),
  "maxH": _makeTransformer_default("maxHeight"),
  "minH": _makeTransformer_default("minHeight"),

  "grow": _makeTransformer_default("flexGrow"),
  "shrink": _makeTransformer_default("flexShrink"),
  "basis": _makeTransformer_default("flexBasis"),

  "alignItems": _makeTransformer_default("alignItems"),
  "alignSelf": _makeTransformer_default("alignSelf"),
  "alignContent": _makeTransformer_default("alignContent"),
  "justifyContent": _makeTransformer_default("justifyContent"),

  "radius": _makeTransformer_Radius(),

  "background": _makeTransformer_default("backgroundColor"),
}

function _makeTransformer_default(prop: keyof BoxPropsStyle): Transformer {
  return function (_: UncheckedTheme, val: any): BoxPropsStyle {
    return { [prop]: val }
  }
}

function _makeTransformer_Radius(): Transformer {
  return function (_: UncheckedTheme, radius: any): BoxPropsStyle {
    if (typeof radius === "number") {
      return { borderRadius: radius }
    } else {
      return {
        borderTopStartRadius: radius[0],
        borderTopEndRadius: radius[1],
        borderBottomEndRadius: radius[2],
        borderBottomStartRadius: radius[3],
      }
    }
  }
}

// Box spacing

type BoxPropsStyle = RN.ViewStyle

type Transformer = (theme: UncheckedTheme, val: any) => BoxPropsStyle

type BoxSpace = number
type BoxSpace_1_4 = BoxSpace | BoxSpaceArr
type BoxSpaceArr =
  | [BoxSpace]
  | [BoxSpace, BoxSpace]
  | [BoxSpace, BoxSpace, BoxSpace]
  | [BoxSpace, BoxSpace, BoxSpace, BoxSpace]

// Space arguments can be numbers or named theme-given values; and, it can be
// an array of top/right/bottom/left values. Assign the appropriate style names
// and values, e.g `p={['10v', '20h']}` to `{ paddingVertical: 10, paddingHorizontal: 20 }`
function _makeTransformer_Space1_4(prop: keyof BoxPropsStyle): Transformer {
  return function (theme: UncheckedTheme, val: BoxSpace_1_4): BoxPropsStyle {
    if (typeof val === "number") {
      return { [prop]: val }
    }

    if (!Array.isArray(val)) {
      throw new Error(`Unexpected _makeTransformer_Space1_4 value: ${val}`)
    }

    val = val.map((val) => _transformBoxSpaceValue(theme, val)) as BoxSpaceArr
    switch (val.length) {
      case 1:
        return { [prop]: val[0] }
      case 2:
        return { [prop + "Vertical"]: val[0], [prop + "Horizontal"]: val[1] }
      case 3:
        return { [prop + "Top"]: val[0], [prop + "Horizontal"]: val[1], [prop + "Bottom"]: val[2] }
      case 4:
        return {
          [prop + "Top"]: val[0],
          [prop + "Right"]: val[1],
          [prop + "Bottom"]: val[2],
          [prop + "Left"]: val[3],
        }
      default:
        throw new Error(`Unexpected _makeTransformer_Space1_4 value length: ${val}`)
    }
  }
}

// _transformBoxSpaceValue takes Space values, and checks them against the given view theme.
// If the value corresponds to a theme-named value, then replace it with its given theme value.
function _transformBoxSpaceValue(theme: UncheckedTheme, spaceValue: BoxSpace) {
  if (typeof spaceValue === "number") {
    return spaceValue
  }
  let spaceKey = spaceValue as keyof typeof theme.spaces
  return spaceKey in theme.spaces ? theme.spaces[spaceKey] : spaceValue
}

type RequireExactlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys]

function _makeWritableCopy<T extends {} | null>(obj: T, additionalProps?: T): NonNullable<T> {
  return { ...obj, ...additionalProps } as NonNullable<T>
}
