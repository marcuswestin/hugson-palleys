export const config = {
  server: {
    protocol: "http",
    hostname: "localhost",
    port: 8086,
    getURL: getServerURL,
  },
}

function getServerURL() {
  return `${config.server.protocol}://${config.server.hostname}:${config.server.port}/`
}
