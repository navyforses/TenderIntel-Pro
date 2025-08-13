// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Simple Supabase client configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
}

// Simple auth functions for client-side
export const supabaseAuth = {
  signIn: async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: "Supabase not configured" }
    }

    try {
      const response = await fetch(`${supabaseConfig.url}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseConfig.anonKey,
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store session in localStorage
        localStorage.setItem("supabase_session", JSON.stringify(data))
        return { data, error: null }
      } else {
        return { data: null, error: data }
      }
    } catch (error) {
      return { data: null, error: { message: "Network error" } }
    }
  },

  signUp: async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: "Supabase not configured" }
    }

    try {
      const response = await fetch(`${supabaseConfig.url}/auth/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseConfig.anonKey,
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      return response.ok ? { data, error: null } : { data: null, error: data }
    } catch (error) {
      return { data: null, error: { message: "Network error" } }
    }
  },

  signOut: async () => {
    localStorage.removeItem("supabase_session")
    return { error: null }
  },

  getSession: () => {
    if (typeof window === "undefined") return null
    const session = localStorage.getItem("supabase_session")
    return session ? JSON.parse(session) : null
  },
}
