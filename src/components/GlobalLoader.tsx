export function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-soft-cream flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center animate-pulse">
        {/* Pulsing ring behind the logo */}
        <div className="absolute inset-0 rounded-full border-4 border-metallic-gold/30 animate-ping" style={{ margin: '-20px' }}></div>
        
        <img 
          src="/logo.jpg" 
          alt="Roymall Scents Loading" 
          className="w-32 md:w-48 h-auto object-contain drop-shadow-2xl z-10"
        />
      </div>
      <div className="mt-12 flex flex-col items-center">
        <p className="text-metallic-gold font-label-md uppercase tracking-[0.3em] text-sm animate-pulse">
          Curating Elegance
        </p>
        <div className="mt-4 flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-regal-navy animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-regal-navy animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-regal-navy animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
