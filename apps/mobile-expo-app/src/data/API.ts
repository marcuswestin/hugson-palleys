import { AppdOutAPI } from "../shared/universal/api/api-specs"
import { makeAPIClient } from "../shared/universal/libs/lib-api/lib-api-specification"

const API = makeAPIClient(AppdOutAPI)

export default API
