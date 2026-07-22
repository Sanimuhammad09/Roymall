export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  notes?: { top: string; heart: string; base: string }
  stock: number
}

// Mock Database
let mockProducts: Product[] = [
  { id: '1', name: "Oud Royale", brand: "Roymall Scents", price: 85000, category: 'Oud', stock: 15, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtUh0O7WZGNjppNPegzY2NgJo-kqTJq5W4UroUR7pQoclxge0G-fqSuZvtlIkfyK6-KGcfC6JUK7Y7RdDTrEuPEC2VXmVlM4cnXgvzglp99096trFJi2kIFKcrlbSowifTtq0eODeBZq-RnjX8G3JZxQ6o4vQmrDtD_arocmL35B4ZhSCcPU4QoOzZp-K68qh5aG7toLemSi9s00rmTXLXS8xmxrGe8P8eLgJjqUWZp55c0K8u_D1o", notes: { top: "Intense Wood", heart: "Vanilla", base: "Amber" } },
  { id: '2', name: "Desert Rose", brand: "Roymall Scents", price: 72500, category: 'Floral', stock: 8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDJLCIGleE2uAhnqelHrLJBuWiVR0MIncjW4EYTuA8BO2jynWcN5QMnikwdwIZwNoK5EEhKxG7PlH6PnH0AVSW0jvb37uKz0ojnPzbojEI0U-0OBzONEjwkQskNjdvy3bhL4FtTUSCuF9ws8gycJdpSUQJrqh5dTsGdjJbFQT2f31dllESHAe6sWKUENTthh-dVjhCOgj7TjvJKo91artXY7a9HdL6qPdTio51ejQlz5oLLqAJYXyW", notes: { top: "Damask Rose", heart: "Saffron", base: "Musk" } },
  { id: '3', name: "Velvet Noir", brand: "Roymall Scents", price: 94000, category: 'Spicy', stock: 12, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuFhaXENpuN_qRNerR7SLPlHk6vMYz_0Md1E1KNDdLSKe8UA79YsRrOtuDhQ-NSmKE4_7D2t_KGTSNidfTt40rCe4PNseS7dw_-jVwgB2SizsJXhlrZbI8ln19_gDPqbghFneAQybHfsiIlu83A6njmDKodjKNhbMfC10ykGpA_QzAg_keDYJrJRSeSlyAMAVcXphNyODZisgroSdOKHx2tnzL4ELmMp8iGcJjXKbfX9Cmb5eaTWnp", notes: { top: "Black Pepper", heart: "Leather", base: "Cedar" } },
  { id: '4', name: "Azure Mist", brand: "Roymall Scents", price: 68000, category: 'Aquatic', stock: 25, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2bMTVinbZ39EfSHnx4J-gqp1ArnCiQ5lrfzljNInlh3ChjCHbSWbqAqXDn-sh0v5sK4WTN24EM_LduR-jfw2g7dBkzeHwvo8B_ji6NGxgnlhqXUJqWxYqxJvtnFZBlTY2bNH443F_QCJY0Cp0XrkCbq2rTaCwQCPx3J-iClgM9eTBtaRXO9AqXwnp-atMd19puRwDFh_lmFS3sDgPJXOiQDWML7N_by7xvLh9mBdRHYei8ViB69dO", notes: { top: "Sea Salt", heart: "Bergamot", base: "Neroli" } },
  { id: '5', name: "Midnight Jasmine", brand: "Roymall Scents", price: 55000, category: 'Floral', stock: 10, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDclHNEsi6sE0dUfXdlhG32Pkp4jLlIC_5r6TK4EWGNSfzBMbBcnbsmico9XoW-R89SMpjKoYdwfD0I8qFr8ASxDjQhCi5xA5CQbu0-rxR9Iz7jRDke_cT2x2xXbY_9GosuCTO_JlEi5d92kG3o_MJYxCteqi3RGc3tvlQZEEPLMe03Wm1c7tzYvqF_zgYnJVkuwE6-aG3lMfHgledst0u7fTteSUygVh13ZjcbLuQ1muG1dpE1RJFo", notes: { top: "Floral", heart: "Exotic", base: "Jasmine" } },
  { id: '6', name: "Citrus Bloom", brand: "Roymall Scents", price: 48000, category: 'Citrus', stock: 18, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMHdCzOp6kJG7B_KK2mBSNxMlnxkYC8IHNGHfgKTprlvbSMYJJKCvR2seb2ZSDPRdL6bM9pbth5DnYfVib1S_As3vDW4N22yGPcYbhDyHlq_8w6U9jee8FwuNnGOCEn6FX9KinZfqEzZvbUbIOutD9WJhSIgSimzS3SjHyH3mBAvujHzoKDtXRogIVub5s7vwHboPRfw10yGQChXErM9mqI3c57H-I-TIKoEIVjil-kzzeNg-DTCtB", notes: { top: "Fresh", heart: "Vibrant", base: "Citrus" } },
  { id: '7', name: "Ethereal Silk", brand: "Roymall Scents", price: 62000, category: 'Floral', stock: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoZRUMKPuvsy6fTA6BsRfy5M8gvjxPOqPatdOJTEfZETeZRCChoD1FWZbUxwGHtd80CBOPyvieenCyVISv9WTlsfVAiSdDJ0cg5CeWRdhkvLht8q7SksIM8PJr0lWiOwgLR8-RNQqnM05Y9xdV9UPyQEY4Qrg6x6YI7VeR5kTtoGWUmttugyQ37xN4LXAQ0wHuoLYgJ4fzOTX1iNUYHXSUnDV4RYky4CzWindxYdvswpnzxWWisimD", notes: { top: "Powdery", heart: "Sweet", base: "Silk" } },
  { id: '8', name: "Imperial Tobacco", brand: "Roymall Scents", price: 78000, category: 'Spicy', stock: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZs27Xi-0Vo2kLO-x2ArnArhlMlW9csH5Djk_aTTw1fmCpPdZNhMnSQtJBvsYX2gDfv1jD59K8VBTbQgTktfEzuaIm5-Au6CFENG0dZBdzFZREulr_aXSEri-BRKiP0BM1LGUr6uKPd4HZgWonQg9ot5tJGJXB0yP5mpCb-p8XYvp2THtJecF4PZUHTIdUVKAlqr_35eBwR2ctPC0Xn2ln7sR_KwdY2zTQm-_hiL9UTIhOxITM2XX1", notes: { top: "Spicy", heart: "Warm", base: "Tobacco" } },
  { id: '9', name: "Oceanic White", brand: "Roymall Scents", price: 45000, category: 'Aquatic', stock: 22, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrie0CKpeesNqqjvu4nZY3oGDGJ2keVKfikvhz1c5F8hQq2QOB7Tj0S59ZbCyCQyuBOYUXKYZ7OahzzTqSHnYXvPl3nq4yRzIUlb4ow2RftTeJueiotlLSsUfWZ5XNDITPfDYjBLtbR1ALzDKDwiadQD8waBK66uTE7n6renBljUZOYmtSNZPxCRHPwB4HtsTnM9zuwc-CtqNY_cZXwXvS0-kTvYB_f4fKXtRUIs4t-0BkyEKPTrHs", notes: { top: "Aquatic", heart: "Clean", base: "White Musk" } },
  { id: '10', name: "Amber Vintage", brand: "Roymall Scents", price: 110000, category: 'Oud', stock: 2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB26CpQ-Tyx9weP_th0E3MvaaL2AozVOb2U2EEkxvCxK1SKDyx532rjo_YTrR4iTmB4yaP67fe-bGHjCbLesVdLWzZLkw8TQfp6pG8Zj9iWfgm-LWdHZoqGD_adQoLtalyXn3UH4v2Uw3HClhRl-we7O7hvUD_ksM0KSS0Bsbx0uyyF3-M_uYbbCcsO2alnfhRJGYzSw6G6xPagf_dgYScoZ8aRaqadBj5sAnIK3bePmQIzl4-H5Irs", notes: { top: "Rich", heart: "Resin", base: "Amber" } },
  { id: '11', name: "Obsidian Night", brand: "Roymall Scents", price: 88000, category: 'Spicy', stock: 7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsi1g9DD3aItgloc62SkCK8riwLi_vTXre5adctjAA0WlrRVu84covd2-1zNoJi8L7pvfsB2Q3LGiY65WG3FY5zef9r4-tRBpwkdFKaGqM-bvEJzT_nRdZb1ItI0xw5WhgeMTrZx67sGZaWfzJ23qcTvNg8ek584--kWpaO4cvvAyydv0pZo4mztCFQ75dJ5qjAqU1kvicLslZ2jlddLIxswT1SB8mJb8W9whN_hqPLKYB2OvZFPcK", notes: { top: "Incense", heart: "Vetiver", base: "Obsidian" } },
  { id: '12', name: "Peony Cloud", brand: "Roymall Scents", price: 52000, category: 'Floral', stock: 14, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbXo_afSFWXdRL5N9-xSBbejs55HYgLOx1Vc87qnFsPyYAtm9nKgbaakWmxjOBW98oGpUY22AckHHgFPSmjSt-yPpdiJlceZbFpOLS4KyZyHJ6nhDgPhg77wST24si5oOLi_TJf_b9iuy9U4JorybVFt8bM1IFhBwu5tth3FtwkPfNOywwlPVCxdNG4IbAm5hCQ61Fjw3ZLPIAfPX-J-_UD7ETgDGfz6ynUtMWVM463R8zuMM0P-CT", notes: { top: "Floral", heart: "Soft", base: "Peony" } },
]

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const api = {
  getProducts: async () => {
    await delay(500)
    return [...mockProducts]
  },
  getProduct: async (id: string) => {
    await delay(300)
    return mockProducts.find(p => p.id === id)
  },
  updateStock: async (id: string, newStock: number) => {
    await delay(400)
    mockProducts = mockProducts.map(p => p.id === id ? { ...p, stock: newStock } : p)
    return mockProducts.find(p => p.id === id)
  }
}
