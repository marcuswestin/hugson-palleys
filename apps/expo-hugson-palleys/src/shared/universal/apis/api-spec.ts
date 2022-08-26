import { config } from "../config"
import { APIRuntimeSpecs, APISpecification } from "./lib-api/lib-api-specification"

export interface TestAPI extends APISpecification {
  apiPoints: {
    ping: {
      request: { message: string }
      response: { message: string }
    }
  }
}

export const TestAPI: APIRuntimeSpecs<TestAPI> = {
  apiHost: config.server.getURL(),
  apiBaseRoute: "api/test",
  apiPointNames: ["ping"],
}
