import { Hono } from "@hono/hono";
export type { Hono };
import { logger } from "@hono/hono/logger";
import { serveStatic } from "@hono/hono/deno";
import {cors} from "@hono/hono/cors"
import { createMessage } from "./components/router.tsx";
import { app as api } from "./api/mod.ts";

/**
 * The Hono application for this project.
 *
 * @example
 * ```ts
 * const res: Response = await app.request("/");
 * ```
 */
export const app: Hono = new Hono();
app.use(logger());
app
  .use("/api",  cors({
    origin: ['https://rod.expfrom.me', 'http://localhost:8000'],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'], // ここに追加
    allowMethods: ['POST', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  }))
  .route("/", createMessage)
  .route("/api", api)
  .use("/favicon.ico", serveStatic({ path: "./public/images/favicon.ico" }))
  .use("/public/*", serveStatic({ root: "./" }));

Deno.serve(app.fetch);
