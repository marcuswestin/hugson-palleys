import apiServer from "./api/apiServer"
import { config } from "./shared/universal/config"

console.log("Start server on", config.server.getURL())

Bun.serve({
  port: config.server.port,
  async fetch(req: Request) {
    return apiServer.handleRequest(req)
  },
})
