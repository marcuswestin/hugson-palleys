import { APIRuntimeSpecs, APISpecification, makeAPIClient } from "./lib-api-specification"
import { makeAPIServer } from "./lib-api-server"
import assert from "assert"

// Example API Specification
////////////////////////////

export interface ExampleAPI extends APISpecification {
  apiPoints: {
    upperCase: {
      request: { text: string }
      response: { upperCased: string }
    }
    double: {
      request: { num: number }
      response: { doubled: number }
    }
  }
}

export const ExampleAPI: APIRuntimeSpecs<ExampleAPI> = {
  apiHost: "http://localhost:3004",
  apiBaseRoute: "api/ExampleAPI",
  apiPointNames: ["upperCase", "double"],
}

// Example API Server implementation
////////////////////////////////////

const exampleAPIServer = makeAPIServer(ExampleAPI, {
  upperCase: async ({ text }) => {
    return { upperCased: text.toUpperCase() }
  },
  double: async ({ num }) => {
    return { doubled: num * 2 }
  },
})

// Example run of server & client
/////////////////////////////////

async function runExampleAPIServerAndClient() {
  console.log("Start server")
  const server = Bun.serve({
    port: 3004,
    fetch: (req) => exampleAPIServer.handleRequest(req),
  })

  console.log("Run client tests")
  await runClient()

  console.log("Done! Shut down server")
  await server.stop()
}

await runExampleAPIServerAndClient()

async function runClient() {
  const exampleAPIClient = makeAPIClient(ExampleAPI)

  const res = await exampleAPIClient.double({ num: 4 })
  assert.equal(res.doubled, 8)

  const res2 = await exampleAPIClient.upperCase({ text: "lowercase" })
  assert.equal(res2.upperCased, "LOWERCASE")
}
