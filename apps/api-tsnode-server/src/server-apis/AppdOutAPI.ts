import { AppdOutAPI } from "../shared/universal/api/api-specs"
import { makeAPIServer } from "../shared/universal/libs/lib-api/lib-api-server"

export default makeAPIServer(AppdOutAPI, {
  ping: async (req) => {
    return { message: "pong: " + req.message }
  },
  setAvailability: async (req) => {
    return { availablePeople: [] }
  },
})
