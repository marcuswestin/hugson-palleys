import * as http from "http"
import AppdOutAPI from "./src/server-apis/AppdOutAPI"
import DB from "./src/server-db/DB"
import { config } from "./src/shared/universal/config"

startServer()

async function startServer() {
  console.log("DB: Connect...")
  await DB.connect()
  console.log("DB: Connected!")

  console.log("Server: start at", config.server.getURL())
  let server = http.createServer((req, res) => {
    AppdOutAPI.handleRequest(req, res)
  })
  server.listen(config.server.port)
}
