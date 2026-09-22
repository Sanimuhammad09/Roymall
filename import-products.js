import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importData() {
  console.log("Starting product import from Fragrance Forte...");

  let page = 1;
  let hasMore = true;
  let totalImported = 0;

  while (hasMore) {
    console.log(`Fetching page ${page}...`);
    try {
      const response = await fetch(`https://fragranceforte.com.ng/wp-json/wc/store/products?per_page=50&page=${page}`);
      
      if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
           hasMore = false;
           break;
        }
        throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
      }

      const products = await response.json();
      
      if (products.length === 0) {
        hasMore = false;
        break;
      }

      for (const item of products) {
        // 1. Process Categories
        let categoryId = null;
        if (item.categories && item.categories.length > 0) {
          const cat = item.categories[0];
          // Try to insert or select category
          const { data: existingCat } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', cat.slug)
            .single();

          if (existingCat) {
            categoryId = existingCat.id;
          } else {
            const { data: newCat, error: catError } = await supabase
              .from('categories')
              .insert([{ name: cat.name, slug: cat.slug }])
              .select()
              .single();
              
            if (catError) {
              console.error(`Error inserting category ${cat.name}:`, catError.message);
            } else if (newCat) {
              categoryId = newCat.id;
            }
          }
        }

        // 2. Process Brand
        let brand = '';
        if (item.brands && item.brands.length > 0) {
          brand = item.brands[0].name;
        } else if (item.tags && item.tags.length > 0) {
           // Fallback to tags if brand isn't explicitly set in woo-brands
           brand = item.tags[0].name.split(' ')[0]; // Very rough approximation
        }

        // 3. Process Price
        // WooCommerce prices in this API are returned as strings like "9700000" for 97,000.
        // The minor unit is usually 100, so we divide by 10^minor_unit (2).
        let minorUnit = item.prices?.currency_minor_unit || 2;
        let divisor = Math.pow(10, minorUnit);
        
        let price = parseFloat(item.prices?.price || '0') / divisor;
        let originalPrice = parseFloat(item.prices?.regular_price || '0') / divisor;
        
        if (price === 0 && originalPrice > 0) price = originalPrice;
        if (originalPrice === price) originalPrice = null;

        // 4. Process Images
        let image = '';
        if (item.images && item.images.length > 0) {
           image = item.images[0].src;
        }

        // 5. Stock
        let stock = 10; // default
        if (item.stock_availability && item.stock_availability.text) {
           const match = item.stock_availability.text.match(/(\d+)/);
           if (match) stock = parseInt(match[1]);
        }

        // 6. Insert Product
        const productData = {
          name: item.name,
          brand: brand,
          price: price,
          originalPrice: originalPrice,
          image: image,
          categoryId: categoryId,
          stock: stock,
          isNewArrival: item.categories?.some(c => c.slug === 'new-arrivals') || false,
          isBestSeller: item.categories?.some(c => c.slug === 'best-seller') || false,
          // Strip HTML from description
          size: item.name.match(/(\d+(ml|oz))/i)?.[0] || null
        };

        const { error: prodError } = await supabase
          .from('products')
          .insert([productData]);

        if (prodError) {
          console.error(`Error inserting product ${item.name}:`, prodError.message);
        } else {
          totalImported++;
        }
      }

      page++;
    } catch (err) {
      console.error("Fetch error:", err);
      hasMore = false;
    }
  }

  console.log(`\nImport complete! Successfully imported ${totalImported} products.`);
}

importData();
