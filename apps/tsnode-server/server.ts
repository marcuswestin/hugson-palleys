import * as http from "http"
import AppdOutAPI from "./src/server-apis/AppdOutAPI"
import { config } from "./src/shared/universal/config"

console.log("Start server at", config.server.getURL())

let server = http.createServer((req, res) => {
  AppdOutAPI.handleRequest(req, res)
})
server.listen(config.server.port)
