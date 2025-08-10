export type Product = {
  id: string
  title: string
  price: number
  description: string
  images: string[] // data URLs
  condition: "New" | "Like New" | "Good" | "Fair" | "For Parts"
  category: string
  tags: string[]
  sellerId: string
  postedAt: string // ISO
  status: "available" | "requested" | "sold"
}

export type UserType = {
  id: string
  name: string
  email?: string
  avatar?: string
  year?: string
  department?: string
}

export type Message = {
  id: string
  from: string // user id
  text: string
  at: string // iso
}

export type Chat = {
  id: string
  productId: string
  participants: string[] // buyer, seller
  messages: Message[]
}

export type PurchaseRequest = {
  id: string
  productId: string
  buyerId: string
  sellerId: string
  status: "pending" | "accepted" | "declined"
  createdAt: string // ISO
}
