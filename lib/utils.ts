import { Product } from '@/types'

export const uid = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 9)}`
export const nowIso = () => new Date().toISOString()

// small AI refine mock
export const aiRefine = async (text: string) => {
  // Very simple heuristic: trim, capitalize, fix trailing punctuation, expand short fragments.
  await new Promise((r) => setTimeout(r, 600))
  if (!text) return ""
  let t = text.trim()
  t = t.replace(/\s+/g, " ")
  if (!/[.!?]$/.test(t)) t = t + "."
  t = t[0].toUpperCase() + t.slice(1)
  // simple expansion
  if (t.length < 40) t = t + " Great condition, available for pickup at campus."
  return t
}

export function arraysEq(a: any[], b: any[]) {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

export function placeholderImage(i: number) {
  // tiny SVG data URL for placeholder
  const colors = ["#334155", "#0f172a", "#1e293b", "#062344", "#123456", "#0b3a3a"]
  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='${colors[i%colors.length]}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='white'>Sample Image ${i+1}</text></svg>`)
  return `data:image/svg+xml;utf8,${svg}`
}

export const STORAGE_KEYS = {
  PRODUCTS: "cm_products_v1",
  USER: "cm_user_v1",
  CHATS: "cm_chats_v1",
} as const
