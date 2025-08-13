import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {
  // If Supabase is not configured, show setup message directly
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">TenderIntel Pro</h1>
          <p className="text-lg text-gray-600">Supabase-ის კონფიგურაცია საჭიროა</p>
        </div>
      </div>
    )
  }

  // Get the user from the server
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  // If no user, redirect to login
  redirect("/auth/login")
}
