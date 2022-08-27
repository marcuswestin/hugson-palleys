import { TestAPI } from "../shared/universal/apis/api-specs"
import { makeAPIServer } from "../shared/universal/apis/lib-api/lib-api-server"

export default makeAPIServer(TestAPI, {
  ping: async (req) => {
    return { message: "pong: " + req.message }
  },
})
