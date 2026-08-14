import { redirect } from "next/navigation"

export default function HybridPage() {
  redirect("/store?type=hybrid")
}
