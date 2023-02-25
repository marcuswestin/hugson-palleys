const envName = "dev"

export const config = {
  env: envName,
  server: {
    protocol: "http",
    hostname: "localhost",
    port: 8086,
    getURL: getServerURL,
  },
  pgDB: {
    user: "postgres",
    host: "localhost",
    dbName: `appdout_${envName}`,
    password: "password",
    port: 5432,
    getURL: getDBURL,
  },
}

function getServerURL() {
  return `${config.server.protocol}://${config.server.hostname}:${config.server.port}/`
}

function getDBURL() {
  return `postgresql://${process.env.USER}:password@localhost:5432/appdout_dev`
}
