import { serve } from "https://deno.land/std@0.153.0/http/server.ts";
import { config } from "./src/shared/config.ts";

const handler = (request: Request): Response => {
  const userAgent = request.headers.get("user-agent") ?? "Unknown";
  const body =
    `Your user-agent is:\n\n${userAgent}` +
    `\n\nserverURL: ${config.server.getURL()}`;

  return new Response(body, { status: 200 });
};

const serverURL = config.server.getURL();
console.log(`HTTP webserver running. Access it at: ${serverURL}`);
await serve(handler, { port: config.server.port });
