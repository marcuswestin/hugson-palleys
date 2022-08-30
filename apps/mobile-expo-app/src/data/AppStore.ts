import { onSnapshot, types } from "mobx-state-tree"

type Screen = "Home" | "Test"

const AppStoreModel = types
  .model("AppStore", {
    screen: types.enumeration<Screen>(["Home", "Test"]),
  })
  .actions((self) => {
    return {
      navigateHome: () => (self.screen = "Home"),
      navigateTest: () => (self.screen = "Test"),
    }
  })

const AppStore = AppStoreModel.create({
  screen: "Home",
})

onSnapshot(AppStore, (snapshot) => {
  console.log("AppStore update", snapshot)
})

export default AppStore
