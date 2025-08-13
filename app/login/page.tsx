"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"

export default function Login() {
  const r = useRouter()
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "owner@local" && pw === "owner123") {
      localStorage.setItem("TI_OWNER", "1")
      r.push("/dashboard")
    } else {
      alert("არასწორი ავტორიზაცია")
    }
  }

  return (
    <form onSubmit={handle} className="space-y-4 max-w-sm mx-auto mt-20">
      <input
        className="border p-2 w-full"
        placeholder="ელფოსტა"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="პაროლი"
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        შესვლა
      </button>
    </form>
  )
}
