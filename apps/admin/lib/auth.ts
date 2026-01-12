import { hash, compare } from "bcryptjs"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prismaAdmin } from "@/lib/prisma"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000",
  ],
  database: prismaAdapter(prismaAdmin, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        return await hash(password, 10);
      },
      verify: async ({ hash: hashStr, password }: { hash: string; password: string }) => {
        return await compare(password, hashStr);
      },
    }
  },
  secret: process.env.BETTER_AUTH_SECRET || "temp_secret_for_build",
  user: {
    modelName: "User", // Maps to 'admins' table via Prisma
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "ADMIN"
      },
      isActive: {
        type: "boolean",
        defaultValue: true
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  }
})
