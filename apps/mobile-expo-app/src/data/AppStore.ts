import { onSnapshot, types } from "mobx-state-tree"

type Screen = "Home" | "Test" | "Availability"

const AppStoreModel = types
  .model("AppStore", {
    screen: types.enumeration<Screen>(["Home", "Test", "Availability"]),
  })
  .actions((self) => {
    return {
      navigateToScreen: (screen: Screen) => (self.screen = screen),
    }
  })

const AppStore = AppStoreModel.create({
  screen: "Home",
})

onSnapshot(AppStore, (snapshot) => {
  console.log("AppStore update", snapshot)
})

export default AppStore
