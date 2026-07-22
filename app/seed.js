import fs from 'fs'

const API_BASE = 'https://roymall-backend-production.up.railway.app/api'

const seedData = async () => {
  console.log('--- Starting Seeding Process ---')
  
  // 1. Login to get Admin Token
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@roymallscents.com', password: 'admin123' })
  })
  const loginData = await loginRes.json()
  const token = loginData.data?.accessToken
  if (!token) throw new Error('Failed to login as admin')
  
  console.log('✅ Logged in as admin')
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  // 2. Create Categories
  const categoriesToCreate = [
    { name: 'Eau de Parfum', slug: 'eau-de-parfum', description: 'Long-lasting signature scents' },
    { name: 'Extrait de Parfum', slug: 'extrait-de-parfum', description: 'The purest, most concentrated essence' },
    { name: 'Special Edition', slug: 'special-edition', description: 'Limited run artisanal masterpieces' }
  ]
  
  const categoryIds = {}
  
  for (const cat of categoriesToCreate) {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cat)
    })
    const data = await res.json()
    // It could be data.id or data.data.id depending on wrapper
    const createdCat = data.data || data
    categoryIds[cat.slug] = createdCat.id
    console.log(`✅ Created category: ${cat.name}`)
  }

  // 3. Create Products
  const productsToCreate = [
    {
      name: "Midnight Saffron",
      sku: "EDP-MS-001",
      price: 45000,
      stockQuantity: 100,
      categoryId: categoryIds['eau-de-parfum'],
      tagline: "A bold, mysterious dance of spice and leather.",
      description: "Midnight Saffron is a seductive journey into the heart of an Arabian night. Opening with the vivid warmth of crushed saffron, it blooms into a dark romantic core of black rose, settling onto an irresistible bed of worn leather and smoky oud. Perfect for evening wear.",
      isBestSeller: true,
      isNewArrival: false,
      topNotes: ["Saffron", "Cardamom", "Black Pepper"],
      heartNotes: ["Black Rose", "Geranium"],
      baseNotes: ["Leather", "Oud", "Patchouli"],
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Oud Royale",
      sku: "EXT-OR-002",
      price: 120000,
      stockQuantity: 25,
      categoryId: categoryIds['extrait-de-parfum'],
      tagline: "The crown jewel of Middle Eastern perfumery.",
      description: "Crafted for connoisseurs, Oud Royale features incredibly rare aged agarwood sourced from Assam. Highly concentrated as an Extrait de Parfum, just a single drop offers remarkable 24-hour longevity. An unapologetically opulent scent that commands attention.",
      isBestSeller: true,
      isNewArrival: false,
      topNotes: ["Rosewood", "Cardamom"],
      heartNotes: ["Smoked Sandalwood", "Vetiver"],
      baseNotes: ["Aged Oud", "Amber", "Tonka Bean"],
      image: "https://images.unsplash.com/photo-1595425970377-c9703d740870?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Vanilla Silk",
      sku: "EDP-VS-003",
      price: 35000,
      stockQuantity: 150,
      categoryId: categoryIds['eau-de-parfum'],
      tagline: "A sophisticated, non-gourmand take on Madagascar vanilla.",
      description: "Forget everything you know about sweet vanilla. Vanilla Silk surrounds pure Madagascar vanilla bean with dry white woods, soft musk, and a surprising pinch of sea salt. It feels like slipping into a silk robe.",
      isBestSeller: false,
      isNewArrival: true,
      topNotes: ["Sea Salt", "Bergamot"],
      heartNotes: ["White Woods", "Cashmeran"],
      baseNotes: ["Madagascar Vanilla", "White Musk"],
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Bergamot Coast",
      sku: "EDP-BC-004",
      price: 32000,
      stockQuantity: 80,
      categoryId: categoryIds['eau-de-parfum'],
      tagline: "Sun-drenched citrus colliding with ocean spray.",
      description: "A breathtakingly fresh composition that captures a drive along the Amalfi Coast. Zesty Calabrian bergamot and bitter grapefruit splash over a heart of neroli, grounded in sun-bleached cedarwood.",
      isBestSeller: true,
      isNewArrival: false,
      topNotes: ["Calabrian Bergamot", "Grapefruit", "Lemon"],
      heartNotes: ["Neroli", "Orange Blossom"],
      baseNotes: ["Cedarwood", "Ambergris"],
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "L'Artisan Vetiver",
      sku: "SE-LAV-005",
      price: 65000,
      stockQuantity: 40,
      categoryId: categoryIds['special-edition'],
      tagline: "Earthy, green, and radically raw.",
      description: "A special edition celebrating the grassy, earthy complexity of Haitian Vetiver. Pulled straight from the soil and brightened with a crack of pink pepper. It is sharp, masculine-leaning, and incredibly elegant.",
      isBestSeller: false,
      isNewArrival: true,
      topNotes: ["Pink Pepper", "Bitter Orange"],
      heartNotes: ["Clary Sage", "Cypress"],
      baseNotes: ["Haitian Vetiver", "Oakmoss"],
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Rose Éclipse",
      sku: "EDP-RE-006",
      price: 42000,
      stockQuantity: 120,
      categoryId: categoryIds['eau-de-parfum'],
      tagline: "A dark, jammy rose cloaked in shadows.",
      description: "This is not a polite daytime rose. Rose Éclipse uses Turkish rose absolute, made jammy with plum and dark cherry, then draped in heavy incense and patchouli. A gothic masterpiece for the bold.",
      isBestSeller: false,
      isNewArrival: false,
      topNotes: ["Black Plum", "Dark Cherry"],
      heartNotes: ["Turkish Rose Absolute"],
      baseNotes: ["Incense", "Patchouli"],
      image: "https://images.unsplash.com/photo-1595425964071-2b0704d9aab7?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Sandalwood Whisper",
      sku: "EDP-SW-007",
      price: 38000,
      stockQuantity: 60,
      categoryId: categoryIds['eau-de-parfum'],
      tagline: "The quiet luxury of creamy Australian Sandalwood.",
      description: "Minimalist and incredibly chic. A linear, skin-like scent that enhances your natural chemistry rather than masking it. Creamy sandalwood meets a delicate skin-musk that lasts all day in a gentle aura.",
      isBestSeller: true,
      isNewArrival: false,
      topNotes: ["Iris", "Violet Leaf"],
      heartNotes: ["Cardamom", "Papyrus"],
      baseNotes: ["Australian Sandalwood", "Skin Musk"],
      image: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Golden Nectar",
      sku: "EXT-GN-008",
      price: 95000,
      stockQuantity: 30,
      categoryId: categoryIds['extrait-de-parfum'],
      tagline: "Liquid gold dripping with honey and amber.",
      description: "A mesmerizing Extrait that envelops you in a cocoon of warmth. Rich honeycomb, crystallized amber, and toasted almonds blend into a narcotic elixir that turns heads everywhere you go.",
      isBestSeller: false,
      isNewArrival: true,
      topNotes: ["Toasted Almond", "Mandarin"],
      heartNotes: ["Wild Honey", "Jasmine Sambac"],
      baseNotes: ["Crystallized Amber", "Benzoin"],
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Tobacco Lounge",
      sku: "EDP-TL-009",
      price: 48000,
      stockQuantity: 90,
      categoryId: categoryIds['eau-de-parfum'],
      tagline: "Old money, leather armchairs, and fine cigars.",
      description: "Step into an exclusive gentleman's club. Tobacco Lounge opens with spicy cinnamon and dried fruits, settling into a rich heart of pipe tobacco and cacao, resting on sweet cedar and dry vanilla.",
      isBestSeller: false,
      isNewArrival: false,
      topNotes: ["Cinnamon", "Dried Fruits"],
      heartNotes: ["Tobacco Leaf", "Cacao"],
      baseNotes: ["Vanilla", "Cedarwood"],
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Figue Sauvage",
      sku: "SE-FS-010",
      price: 55000,
      stockQuantity: 45,
      categoryId: categoryIds['special-edition'],
      tagline: "The entire fig tree: leaf, fruit, wood, and earth.",
      description: "A photorealistic interpretation of a Mediterranean fig grove in late summer. It captures the milky sap of the green leaves, the sweet purple flesh of the ripe fruit, and the dusty bark of the tree.",
      isBestSeller: true,
      isNewArrival: true,
      topNotes: ["Fig Leaf", "Galbanum"],
      heartNotes: ["Ripe Fig", "Coconut Milk"],
      baseNotes: ["Fig Wood", "White Cedar"],
      image: "https://images.unsplash.com/photo-1616606016140-5e6080516b38?q=80&w=2000&auto=format&fit=crop"
    }
  ]

  for (const prod of productsToCreate) {
    const { image, ...productData } = prod
    
    // 1. Create Product
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(productData)
    })
    const data = await res.json()
    if (!res.ok) {
      console.error(`Failed to create product ${prod.name}:`, data)
      continue
    }
    
    const createdProd = data.data || data
    console.log(`✅ Created product: ${prod.name}`)
    
    // 2. We can't easily upload a remote image file directly from this script using FormData without downloading it first
    // Since we just want them seeded, we will skip the image upload via API and just log out a note
    // For a real DB seeding, we could download the image and use FormData, but since Cloudinary might not be configured,
    // we'll leave the image upload to be tested manually by the user via the UI.
    console.log(`   (Image upload skipped for seed script. Test via Admin UI.)`)
  }

  console.log('--- Seeding Complete ---')
}

seedData().catch(console.error)
