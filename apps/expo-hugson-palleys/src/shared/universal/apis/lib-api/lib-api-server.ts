// API Server
/////////////

import { APIPointFunction, APIRuntimeSpecs, APISpecification } from "./lib-api-specification"

export function makeAPIServer<API extends APISpecification>(api: APIRuntimeSpecs<API>, handlers: APIHandlers<API>) {
  return new APIServer(api, handlers)
}

export function wrapAPIServers(...apiServers: APIServer<any>[]) {
  return new APIServerWrapper(apiServers)
}

// Internal
///////////

class APIServerWrapper {
  constructor(private apiServers: APIServer<any>[]) {}

  async handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url)
    for (const apiServer of this.apiServers) {
      if (apiServer.hasHandler(url)) {
        return await apiServer.handleRequest(req)
      }
    }
    return makeNotFoundResponse(req)
  }
}

function makeNotFoundResponse(req: Request) {
  const text = `Not found: ${req.url}`
  return new Response(text, { status: 404 })
}

type APIHandlers<API extends APISpecification> = {
  [Key in keyof API["apiPoints"]]: APIPointFunction<API["apiPoints"][Key]>
}

class APIServer<API extends APISpecification> {
  private base: string

  constructor(api: APIRuntimeSpecs<API>, readonly handlers: APIHandlers<API>) {
    this.base = "/" + api.apiBaseRoute + "/"
  }

  private getHandler(url: URL) {
    if (!url.pathname.startsWith(this.base)) {
      return null
    }
    const handlerName = url.pathname.replace(this.base, "")
    return this.handlers[handlerName]
  }

  hasHandler(url: URL) {
    return !!this.getHandler(url)
  }

  async handleRequest(req: Request) {
    const url = new URL(req.url)
    const handler = this.getHandler(url)!
    const apiReqData = await req.json()
    const apiResData = await handler(apiReqData)

    return new Response(JSON.stringify(apiResData))
  }
}
