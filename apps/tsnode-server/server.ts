import * as http from "http"
import TestAPI from "./src/server-apis/TestAPI"
import { config } from "./src/shared/universal/config"

console.log("Start server at", config.server.getURL())

let server = http.createServer((req, res) => {
  console.log("REQ:", req.url)
  TestAPI.handleRequest(req, res)
})
server.listen(config.server.port)
