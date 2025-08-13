"use server"

import { redirect } from "next/navigation"

// Mock authentication for MVP testing
const MOCK_USER = {
  email: "owner@local",
  password: "owner123",
  fullName: "TenderIntel Owner",
}

export async function signIn(prevState: any, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "ფორმის მონაცემები არ არის მითითებული" } // Form data is missing
  }

  const email = formData.get("email")
  const password = formData.get("password")

  // Validate required fields
  if (!email || !password) {
    return { error: "ელ-ფოსტა და პაროლი აუცილებელია" } // Email and password are required
  }

  try {
    if (email.toString() === MOCK_USER.email && password.toString() === MOCK_USER.password) {
      // Return success for client-side localStorage handling
      return { success: true, user: { email: MOCK_USER.email, fullName: MOCK_USER.fullName } }
    } else {
      return { error: "არასწორი ელ-ფოსტა ან პაროლი" } // Invalid email or password
    }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "მოულოდნელი შეცდომა. გთხოვთ სცადოთ ხელახლა." } // Unexpected error. Please try again.
  }
}

export async function signUp(prevState: any, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "ფორმის მონაცემები არ არის მითითებული" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  // Validate required fields
  if (!email || !password || !fullName) {
    return { error: "ყველა ველის შევსება აუცილებელია" } // All fields are required
  }

  try {
    if (email.toString() === MOCK_USER.email) {
      return { error: "ეს ელ-ფოსტა უკვე რეგისტრირებულია" } // This email is already registered
    }

    // For MVP, we don't actually create new users
    return { error: "რეგისტრაცია ამჟამად შეზღუდულია MVP ვერსიისთვის. გამოიყენეთ: owner@local" } // Registration is currently limited for MVP version. Use: owner@local
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "მოულოდნელი შეცდომა. გთხოვთ სცადოთ ხელახლა." }
  }
}

export async function signOut() {
  redirect("/login")
}
