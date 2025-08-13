import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: { token_hash?: string; type?: string }
}) {
  const supabase = createServerClient()

  if (searchParams.token_hash && searchParams.type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: searchParams.token_hash,
      type: searchParams.type as any,
    })

    if (!error) {
      // User confirmed successfully, redirect to dashboard
      redirect("/dashboard")
    }
  }

  // If there's an error or no token, redirect to login with message
  redirect("/auth/login?message=დადასტურება ვერ მოხერხდა. გთხოვთ სცადოთ ხელახლა.")
}
