import { onSnapshot, types } from "mobx-state-tree"

export type Screen = "Home" | "Test" | "Availability" | "Kitchen Sink"

const AppStoreModel = types
  .model("AppStore", {
    screen: types.enumeration<Screen>(["Home", "Test", "Availability", "Kitchen Sink"]),
  })
  .actions((self) => {
    return {
      navigateToScreen: (screen: Screen) => (self.screen = screen),
    }
  })

const AppStore = AppStoreModel.create({
  screen: "Kitchen Sink",
})

onSnapshot(AppStore, (snapshot) => {
  console.log("AppStore update", snapshot)
})

export default AppStore
