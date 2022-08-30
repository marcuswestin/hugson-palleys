import { config } from "../config"
import { APIRuntimeSpecs, APISpecification } from "../libs/lib-api/lib-api-specification"

export type Person = {
  displayName: string
  id: number
}

export interface AppdOutAPI extends APISpecification {
  apiPoints: {
    setAvailability: {
      request: { isAvailable: boolean }
      response: { availablePeople: Person[] }
    }

    ping: {
      request: { message: string }
      response: { message: string }
    }
  }
}

export const AppdOutAPI: APIRuntimeSpecs<AppdOutAPI> = {
  apiHost: config.server.getURL(),
  apiBaseRoute: "api/appdout",
  apiPointNames: ["ping", "setAvailability"],
}
