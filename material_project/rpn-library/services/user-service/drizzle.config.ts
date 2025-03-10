// drizzle.config.ts
import type { Config } from 'drizzle-kit'

export default {
  dialect: "postgresql",
  schema: './src/models/*',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
  push: {
    mode: "safe" // This prevents dropping tables
  },
  defaultSchemaName: "public"
} satisfies Config