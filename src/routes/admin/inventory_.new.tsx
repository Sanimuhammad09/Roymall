import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/inventory_/new')({
  component: AddNewProduct,
})

function AddNewProduct() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Form State
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('50')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  
  // Array states
  const [topNotes, setTopNotes] = useState('')
  const [heartNotes, setHeartNotes] = useState('')
  const [baseNotes, setBaseNotes] = useState('')

  const [isNewArrival, setIsNewArrival] = useState(false)
  const [isBestSeller, setIsBestSeller] = useState(false)

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch Categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories()
  })
  const categories = categoriesData?.data || []

  // Mutations
  const createProductMutation = useMutation({
    mutationFn: (data: any) => api.createProduct(data)
  })

  const uploadImageMutation = useMutation({
    mutationFn: ({ productId, formData }: { productId: string, formData: FormData }) => 
      api.uploadProductImages(productId, formData)
  })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handlePublish = async () => {
    if (!name || !sku || !price || !categoryId || !description) {
      setError('Please fill in all required fields (Name, SKU, Price, Category, Description).')
      window.scrollTo(0, 0)
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const productData = {
        name,
        sku,
        price: parseFloat(price),
        stockQuantity: parseInt(stockQuantity) || 0,
        categoryId,
        tagline,
        description,
        isNewArrival,
        isBestSeller,
        topNotes: topNotes ? topNotes.split(',').map(n => n.trim()) : [],
        heartNotes: heartNotes ? heartNotes.split(',').map(n => n.trim()) : [],
        baseNotes: baseNotes ? baseNotes.split(',').map(n => n.trim()) : []
      }

      // Create product
      const created = await createProductMutation.mutateAsync(productData)
      const productId = created.data?.id || created.id

      // Upload image if selected
      if (imageFile && productId) {
        const formData = new FormData()
        formData.append('images', imageFile)
        formData.append('isPrimary', 'true')
        await uploadImageMutation.mutateAsync({ productId, formData })
      }

      queryClient.invalidateQueries({ queryKey: ['products'] })
      setShowModal(true)
    } catch (err: any) {
      setError(err.message || 'Failed to create product.')
      window.scrollTo(0, 0)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 lg:px-8 bg-soft-cream min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-2 font-bold text-3xl">Create New Masterpiece</h2>
          <div className="flex items-center gap-2 text-gray-500">
            <Link to="/admin/inventory" className="hover:text-metallic-gold transition-colors font-bold text-sm">Inventory</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-regal-navy font-semibold text-sm">New Product</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-transparent border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-white transition-all font-bold text-sm disabled:opacity-50">
            Save as Draft
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSubmitting}
            className="px-8 py-3 bg-regal-navy text-metallic-gold font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all font-bold text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 mb-8 font-body-md border border-red-200 shadow-sm">
          {error}
        </div>
      )}

      {/* Form Content */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column: Primary Details */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Basic Information Section */}
          <section className="bg-white p-8 border border-gray-200 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-regal-navy mb-8 border-b border-gray-200 pb-4 font-bold text-2xl">Essential Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">Product Name *</label>
                <input 
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 p-3 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors" 
                  placeholder="e.g. Midnight Saffron" type="text" 
                />
              </div>
              <div>
                <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">SKU Identifier *</label>
                <input 
                  value={sku} onChange={e => setSku(e.target.value)}
                  className="w-full border border-gray-300 p-3 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors" 
                  placeholder="LXS-MS-001" type="text" 
                />
              </div>
              <div>
                <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">Category *</label>
                <select 
                  value={categoryId} onChange={e => setCategoryId(e.target.value)}
                  className="w-full border border-gray-300 p-3 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors appearance-none bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">Price (₦) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500">₦</span>
                  <input 
                    value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full border border-gray-300 p-3 pl-8 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors" 
                    placeholder="0.00" type="number" 
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">Stock Quantity</label>
                <input 
                  value={stockQuantity} onChange={e => setStockQuantity(e.target.value)}
                  className="w-full border border-gray-300 p-3 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors" 
                  placeholder="50" type="number" 
                />
              </div>
            </div>
          </section>

          {/* Fragrance Profile Section */}
          <section className="bg-regal-navy p-10 text-white border border-metallic-gold/30 shadow-md">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-headline-md text-headline-md text-metallic-gold font-bold text-2xl">Olfactory Pyramid</h3>
              <div className="h-[1px] flex-grow bg-metallic-gold/20"></div>
            </div>
            
            <div className="space-y-10">
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-3 text-metallic-gold font-label-md uppercase tracking-widest pt-3 text-xs font-bold">Top Notes</div>
                <div className="col-span-12 md:col-span-9">
                  <textarea 
                    value={topNotes} onChange={e => setTopNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 p-4 font-body-md text-body-md focus:border-metallic-gold focus:ring-0 outline-none h-24 placeholder:text-white/30" 
                    placeholder="Comma separated (e.g., Bergamot, Pink Pepper)"
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-3 text-metallic-gold font-label-md uppercase tracking-widest pt-3 text-xs font-bold">Heart Notes</div>
                <div className="col-span-12 md:col-span-9">
                  <textarea 
                    value={heartNotes} onChange={e => setHeartNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 p-4 font-body-md text-body-md focus:border-metallic-gold focus:ring-0 outline-none h-24 placeholder:text-white/30" 
                    placeholder="Comma separated (e.g., Damask Rose, Jasmine Absolute)"
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-3 text-metallic-gold font-label-md uppercase tracking-widest pt-3 text-xs font-bold">Base Notes</div>
                <div className="col-span-12 md:col-span-9">
                  <textarea 
                    value={baseNotes} onChange={e => setBaseNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 p-4 font-body-md text-body-md focus:border-metallic-gold focus:ring-0 outline-none h-24 placeholder:text-white/30" 
                    placeholder="Comma separated (e.g., Oud, Sandalwood, Vanilla)"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Visuals & Metadata */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* Product Media Section */}
          <section className="bg-white p-6 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-xs uppercase text-regal-navy mb-6 tracking-widest font-bold">Product Imagery</h3>
            
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative aspect-square bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-metallic-gold transition-all overflow-hidden mb-4"
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center p-8 z-10">
                  <span className="material-symbols-outlined text-4xl text-metallic-gold mb-2">add_a_photo</span>
                  <p className="font-label-md text-sm text-gray-500 font-bold">Drop High-Res Master Image</p>
                  <p className="text-[10px] uppercase text-gray-400 mt-2 font-bold">Preferred: 2000 x 2000 px</p>
                </div>
              )}
              {/* Mock Upload Overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                {imagePreview && <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">change_circle</span>}
              </div>
            </div>
          </section>

          {/* Preview Card */}
          <section className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-label-md text-xs uppercase text-gray-500 tracking-widest font-bold">Live Preview</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="aspect-[4/5] bg-gray-100 relative group flex items-center justify-center">
                {imagePreview ? (
                  <img className="w-full h-full object-cover mix-blend-multiply opacity-80" alt="Preview" src={imagePreview} />
                ) : (
                  <span className="material-symbols-outlined text-gray-300 text-6xl">image</span>
                )}
              </div>
              <div className="text-center space-y-2">
                <p className="font-label-md text-xs text-gray-500 uppercase tracking-tighter font-bold">New Creation</p>
                <h4 className="font-headline-md text-headline-md text-regal-navy font-bold text-xl">{name || 'Product Name'}</h4>
                <p className="font-price-lg text-price-lg text-metallic-gold font-bold text-xl">₦ {price ? parseFloat(price).toLocaleString() : '0.00'}</p>
              </div>
            </div>
          </section>

          {/* Organization Section */}
          <section className="bg-white p-6 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-xs uppercase text-gray-500 mb-6 tracking-widest font-bold">Visibility</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="font-body-md text-regal-navy font-bold">Store Visibility</span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-metallic-gold`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform translate-x-6`}></span>
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="font-body-md text-regal-navy font-bold">New Arrival</span>
              <button 
                onClick={() => setIsNewArrival(!isNewArrival)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isNewArrival ? 'bg-metallic-gold' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isNewArrival ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-body-md text-regal-navy font-bold">Best Seller</span>
              <button 
                onClick={() => setIsBestSeller(!isBestSeller)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBestSeller ? 'bg-metallic-gold' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isBestSeller ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </button>
            </div>
          </section>

        </div>
      </div>

      {/* Additional Notes / Ingredients */}
      <section className="mt-12 bg-white p-8 border border-gray-200 shadow-sm">
        <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 font-bold text-2xl">Master Notes & Narrative</h3>
        <div className="space-y-6">
          <div>
            <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">Short Narrative</label>
            <input 
              value={tagline} onChange={e => setTagline(e.target.value)}
              className="w-full border border-gray-300 p-3 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors" 
              placeholder="A one-sentence hook for the product listing..." type="text" 
            />
          </div>
          <div>
            <label className="block font-label-md text-xs uppercase text-gray-500 mb-2 font-bold">Detailed Olfactory Story *</label>
            <textarea 
              value={description} onChange={e => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-4 font-body-md text-body-md focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold outline-none transition-colors h-48" 
              placeholder="Describe the sensory journey, the inspiration behind the scent, and the intended emotion..."
            ></textarea>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-regal-navy/80 backdrop-blur-sm">
          <div className="bg-white p-12 max-w-md text-center border border-metallic-gold shadow-2xl animate-fade-in">
            <span className="material-symbols-outlined text-6xl text-metallic-gold mb-6">check_circle</span>
            <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4 font-bold text-3xl">Essence Recorded</h2>
            <p className="font-body-md text-gray-600 mb-8">The new fragrance has been successfully added to the Luxe Essence master inventory.</p>
            <Link to="/admin/inventory" className="block w-full py-4 bg-regal-navy text-metallic-gold font-label-md uppercase tracking-widest font-bold hover:bg-regal-navy/90 transition-colors">
              Return to Inventory
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
