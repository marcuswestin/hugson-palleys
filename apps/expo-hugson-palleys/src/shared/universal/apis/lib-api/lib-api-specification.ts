// API Specification: types
///////////////////////////

export type APISpecification = {
  apiPoints: Record<APIPointPath, APIPoints>
}

export type APIRuntimeSpecs<API extends APISpecification> = {
  apiHost: string
  apiBaseRoute: string
  apiPointNames: PathsOfAPI<API>[]
}

export type APIPointFunction<APIPoint extends APIPoints> = (req: APIPoint["request"]) => Promise<APIPoint["response"]>

type PathsOfAPI<API extends APISpecification> = keyof API["apiPoints"]
type APIPointPath = string
type APIPoints = {
  request: any
  response: any
}

// API Client
/////////////

type APIClient<API extends APISpecification> = {
  [Key in PathsOfAPI<API>]: APIPointFunction<API["apiPoints"][Key]>
}

export function makeAPIClient<API extends APISpecification>(api: APIRuntimeSpecs<API>): APIClient<API> {
  let apiClient: any = {}
  for (let apiPointName of api.apiPointNames) {
    apiClient[apiPointName] = makeAPIPointClientFunction(api, apiPointName as string)
  }
  return apiClient as APIClient<API>
}

function makeAPIPointClientFunction<API extends APISpecification, APIPoint extends APIPoints>(
  api: APIRuntimeSpecs<API>,
  apiPointName: APIPointPath
): APIPointFunction<APIPoint> {
  return async (request: APIPoint["request"]) => {
    let timeout = 2500
    let url = `${api.apiHost}${api.apiBaseRoute}/${apiPointName}`
    let body = JSON.stringify(request)

    let apiRes = await fetchWithTimeout(url, timeout, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: body,
    })

    if (!apiRes.ok) {
      throw new Error(await apiRes.text())
    }

    try {
      return await apiRes.json()
    } catch (err) {
      return null
    }
  }
}

async function fetchWithTimeout(url: string, timeout: number, params: RequestInit): Promise<Response> {
  return await fetch(url, params)
  const abortController = new AbortController()
  const id = setTimeout(() => abortController.abort(), timeout)
  const response = await fetch(url, { ...params, signal: abortController.signal })
  clearTimeout(id)
  return response
}
