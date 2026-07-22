import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/customers_/new')({
  component: AddNewCustomer,
})

function AddNewCustomer() {
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [notify, setNotify] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
        <div>
          <nav className="flex items-center gap-2 text-gray-500 mb-2">
            <Link to="/admin/customers" className="hover:text-metallic-gold transition-colors font-label-md text-xs">CUSTOMERS</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-regal-navy font-label-md text-xs">ADD NEW</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Create New Customer</h2>
        </div>
        <div className="flex gap-4">
          <Link to="/admin/customers" className="px-6 py-2 border border-gray-400 text-gray-500 font-label-md uppercase tracking-widest hover:bg-gray-100 transition-all font-bold text-sm flex items-center justify-center">Cancel</Link>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-2 bg-metallic-gold text-regal-navy font-label-md font-bold uppercase tracking-widest hover:bg-yellow-500 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70 min-w-[200px]"
          >
            {isSaving ? (
              <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> SAVING...</>
            ) : (
              'SAVE CUSTOMER'
            )}
          </button>
        </div>
      </div>

      {/* Form Layout (Bento-inspired grid) */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Profile and Basic Info */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* Profile Photo Card */}
          <section className="bg-white p-8 border border-gray-200 transition-shadow shadow-sm">
            <h3 className="font-label-md text-label-md text-gray-500 uppercase tracking-widest mb-6 font-bold text-xs">Profile Portrait</h3>
            <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-metallic-gold/30 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:bg-metallic-gold/5 transition-all">
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-4xl text-metallic-gold mb-2">add_a_photo</span>
                    <p className="text-[10px] font-label-md text-gray-500 uppercase leading-tight font-bold">Click to upload photo</p>
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 w-10 h-10 bg-regal-navy text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Supported formats: JPG, PNG, WEBP (Max 2MB). Recommended size: 500x500px.</p>
            </div>
          </section>

          {/* Customer Segment Card */}
          <section className="bg-white p-8 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-label-md text-gray-500 uppercase tracking-widest mb-6 font-bold text-xs">Customer Segment</h3>
            <div className="space-y-4">
              <label className="flex items-center p-4 border border-gray-200 hover:border-metallic-gold transition-colors cursor-pointer group">
                <input className="text-metallic-gold focus:ring-metallic-gold h-4 w-4 border-gray-300" name="segment" type="radio" value="regular" />
                <div className="ml-4">
                  <p className="font-label-md text-sm text-regal-navy font-bold">Regular Customer</p>
                  <p className="text-xs text-gray-500">Standard pricing and seasonal offers.</p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-metallic-gold bg-metallic-gold/5 transition-colors cursor-pointer group">
                <input defaultChecked className="text-metallic-gold focus:ring-metallic-gold h-4 w-4 border-gray-300" name="segment" type="radio" value="vip" />
                <div className="ml-4">
                  <p className="font-label-md text-sm text-regal-navy font-bold">VIP Member</p>
                  <p className="text-xs text-gray-500">Exclusive early access and private collections.</p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-gray-200 hover:border-metallic-gold transition-colors cursor-pointer group">
                <input className="text-metallic-gold focus:ring-metallic-gold h-4 w-4 border-gray-300" name="segment" type="radio" value="wholesale" />
                <div className="ml-4">
                  <p className="font-label-md text-sm text-regal-navy font-bold">Wholesale Partner</p>
                  <p className="text-xs text-gray-500">Bulk order discounts and B2B pricing.</p>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Personal Details Card */}
          <section className="bg-white p-10 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-label-md text-gray-500 uppercase tracking-widest mb-10 border-b border-gray-100 pb-4 font-bold text-xs">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-1">
                <label className="font-label-md text-xs text-gray-500 uppercase font-bold">Full Name</label>
                <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="e.g., Julianne Vossen" type="text" />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-xs text-gray-500 uppercase font-bold">Email Address</label>
                <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="julianne.v@royalmall.com" type="email" />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-xs text-gray-500 uppercase font-bold">Phone Number</label>
                <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="+1 (555) 000-0000" type="tel" />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-xs text-gray-500 uppercase font-bold">Date of Birth (Optional)</label>
                <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy text-sm" type="date" />
              </div>
            </div>
          </section>

          {/* Shipping Address Card */}
          <section className="bg-white p-10 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-label-md text-gray-500 uppercase tracking-widest mb-10 border-b border-gray-100 pb-4 font-bold text-xs">Shipping Information</h3>
            <div className="space-y-10">
              <div className="space-y-1">
                <label className="font-label-md text-xs text-gray-500 uppercase font-bold">Street Address</label>
                <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="123 Luxury Boulevard" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <label className="font-label-md text-xs text-gray-500 uppercase font-bold">City</label>
                  <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="Paris" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-xs text-gray-500 uppercase font-bold">State / Province</label>
                  <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="Ile-de-France" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-xs text-gray-500 uppercase font-bold">Postal Code</label>
                  <input className="w-full bg-transparent border-0 border-b border-gray-300 py-2 focus:ring-0 focus:border-metallic-gold transition-colors font-body-md text-regal-navy placeholder:text-gray-400" placeholder="75001" type="text" />
                </div>
              </div>
            </div>
          </section>

          {/* Internal Notes Card */}
          <section className="bg-white p-10 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-label-md text-gray-500 uppercase tracking-widest mb-6 font-bold text-xs">Internal Curator Notes</h3>
            <div className="relative">
              <textarea className="w-full p-4 bg-gray-50 border-0 border-l-4 border-metallic-gold focus:ring-0 font-body-md text-regal-navy placeholder:text-gray-400 outline-none" placeholder="Mention fragrance preferences, historical interactions, or special requests..." rows={4}></textarea>
              <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[10px] text-gray-400 uppercase font-label-md font-bold">
                <span className="material-symbols-outlined text-xs">info</span> 
                Private to staff only
              </div>
            </div>
          </section>

          {/* Final Action Row */}
          <div className="flex items-center justify-end pt-4">
            <button 
              onClick={() => setNotify(!notify)}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="font-label-md text-sm text-gray-500 uppercase tracking-widest group-hover:text-regal-navy transition-colors font-bold">Notify customer of registration via email</span>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${notify ? 'bg-metallic-gold' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${notify ? 'right-1' : 'left-1'}`}></div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Success Message Overlay */}
      <div className={`fixed bottom-8 right-8 bg-regal-navy text-white px-8 py-4 shadow-2xl transition-all duration-500 border-l-4 border-metallic-gold z-50 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-metallic-gold">check_circle</span>
          <div>
            <p className="font-bold text-sm">Customer Profile Created</p>
            <p className="text-xs text-white/70">Julianne Vossen has been added to VIP segment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
