import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Alpic injects PORT; fall back to MCP_HTTP_PORT, then 3000.
const EnvSchema = z.object({
  MCP_HTTP_PORT: z.coerce.number().int().positive().default(3000),
});

const merged = {
  MCP_HTTP_PORT: process.env.PORT ?? process.env.MCP_HTTP_PORT,
};

const parsed = EnvSchema.safeParse(merged);
if (!parsed.success) {
  console.error("Invalid env:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}
export const config = parsed.data;
