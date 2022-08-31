const envName = "dev"

export const config = {
  env: envName,
  server: {
    protocol: "http",
    hostname: "localhost",
    port: 8086,
    getURL: getServerURL,
  },
  mongoDB: {
    dbName: `${envName}-db`,
    url: "mongodb://127.0.0.1:27017",
  },
}

function getServerURL() {
  return `${config.server.protocol}://${config.server.hostname}:${config.server.port}/`
}
