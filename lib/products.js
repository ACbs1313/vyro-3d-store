export const products = [
  {
    id: "phone-stand",
    slug: "custom-phone-stand",
    name: "Custom Phone Stand",
    price: 19.99,
    category: "Desk",
    description: "A clean, made-to-order phone stand designed for everyday desks.",
    material: "PLA",
    productionTime: "2–4 business days",
    colors: ["Black", "White", "Gray", "Blue"],
    sizes: ["Standard"],
    customization: true,
    image: "https://images.unsplash.com/photo-1555617117-08e13c7e4a9f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cable-organizer",
    slug: "desk-cable-organizer",
    name: "Desk Cable Organizer",
    price: 12.99,
    category: "Desk",
    description: "A compact cable organizer to keep your setup clean and minimal.",
    material: "PLA",
    productionTime: "1–3 business days",
    colors: ["Black", "White", "Gray"],
    sizes: ["Small", "Medium"],
    customization: false,
    image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "plant-pot",
    slug: "geometric-plant-pot",
    name: "Geometric Plant Pot",
    price: 24.99,
    category: "Home",
    description: "A geometric planter made to add a modern touch to your space.",
    material: "PLA",
    productionTime: "3–5 business days",
    colors: ["White", "Black", "Gray"],
    sizes: ["Small", "Medium", "Large"],
    customization: false,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "storage-box",
    slug: "mini-storage-box",
    name: "Mini Storage Box",
    price: 14.99,
    category: "Storage",
    description: "A compact storage box for small desk and everyday essentials.",
    material: "PLA",
    productionTime: "2–4 business days",
    colors: ["Black", "White"],
    sizes: ["Small", "Medium"],
    customization: false,
    image: "https://images.unsplash.com/photo-1604074131667-7a943f0dbe7f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "name-plate",
    slug: "custom-name-plate",
    name: "Custom Name Plate",
    price: 16.99,
    category: "Custom",
    description: "A personalized name plate made specifically for you.",
    material: "PLA",
    productionTime: "2–4 business days",
    colors: ["Black", "White", "Red", "Blue"],
    sizes: ["Small", "Medium"],
    customization: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  }
]

export function getProduct(slug) {
  return products.find((p) => p.slug === slug)
}
