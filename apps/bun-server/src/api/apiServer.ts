import { TestAPI } from "../shared/universal/api-spec"
import { makeAPIServer } from "../shared/universal/lib-api/lib-api-server"

export default makeAPIServer(TestAPI, {
  ping: async (req) => {
    return {
      message: "pong: " + req.message,
    }
  },
})
