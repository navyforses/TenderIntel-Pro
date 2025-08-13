import { cookies } from "next/headers"
import { cache } from "react"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Simple server-side Supabase functions
export const createServerClient = cache(() => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    }
  }

  return {
    auth: {
      getUser: async () => {
        try {
          const cookieStore = cookies()
          const token = cookieStore.get("supabase-auth-token")?.value

          if (!token) {
            return { data: { user: null }, error: null }
          }

          const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            },
          })

          if (response.ok) {
            const user = await response.json()
            return { data: { user }, error: null }
          } else {
            return { data: { user: null }, error: null }
          }
        } catch (error) {
          return { data: { user: null }, error: null }
        }
      },

      getSession: async () => {
        try {
          const cookieStore = cookies()
          const token = cookieStore.get("supabase-auth-token")?.value

          if (!token) {
            return { data: { session: null }, error: null }
          }

          return {
            data: {
              session: {
                access_token: token,
                user: null, // Would need to fetch user separately
              },
            },
            error: null,
          }
        } catch (error) {
          return { data: { session: null }, error: null }
        }
      },
    },
  }
})
