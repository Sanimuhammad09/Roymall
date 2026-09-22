import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useEffect, useRef } from 'react'
import { jsPDF } from 'jspdf'
import * as htmlToImage from 'html-to-image'

export const Route = createFileRoute('/invoice/$id')({
  component: Invoice,
})

function Invoice() {
  const { id } = Route.useParams()
  // Check if admin to use the correct API endpoint, otherwise use the customer endpoint
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('role') === 'ADMIN';

  const { data: orderResponse, isLoading } = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => api.getOrderById(id),
  })

  const invoiceRef = useRef<HTMLDivElement>(null)

  // Trigger print dialog when data is ready
  useEffect(() => {
    if (orderResponse && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('print') !== 'false') {
        setTimeout(() => {
          // window.print()
        }, 500)
      }
    }
  }, [orderResponse])

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;
    
    try {
      // Temporarily hide elements with the no-print class
      const noPrintElements = element.querySelectorAll('.no-print');
      noPrintElements.forEach(el => (el as HTMLElement).style.display = 'none');

      const imgData = await htmlToImage.toPng(element, { pixelRatio: 2, backgroundColor: '#ffffff' });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate height maintaining aspect ratio
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => { img.onload = resolve; });
      const imgHeight = (img.height * pdfWidth) / img.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add subsequent pages if the content is taller than one A4 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const orderNum = order?.orderNumber || order?.id.substring(0,8).toUpperCase();
      pdf.save(`Roymall_Invoice_${orderNum}.pdf`);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      // Restore elements
      const noPrintElements = element.querySelectorAll('.no-print');
      noPrintElements.forEach(el => (el as HTMLElement).style.display = '');
    }
  };

  if (isLoading) return <div className="p-10 font-label-md text-regal-navy">Loading Invoice...</div>
  
  const order = orderResponse?.data || orderResponse
  if (!order) return <div className="p-10 font-label-md text-red-500">Invoice not found</div>

  return (
    <div ref={invoiceRef} className="bg-white min-h-screen text-gray-900 p-8 font-body-md" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
        <div>
          <img src="/logo.jpg" alt="Roymall Scents" className="h-16 object-contain mb-4" />
          <p className="text-sm text-gray-500">Roymall Scents Ltd.</p>
          <p className="text-sm text-gray-500">Gwarimpa</p>
          <p className="text-sm text-gray-500">Abuja, Nigeria</p>
          <p className="text-sm text-gray-500">roymallscents@gmail.com</p>
        </div>
        <div className="text-right">
          <h1 className="font-headline-lg text-4xl text-regal-navy font-bold uppercase tracking-widest mb-2">INVOICE</h1>
          <p className="font-bold text-gray-800">#{order.orderNumber || order.id.substring(0,8).toUpperCase()}</p>
          <p className="text-sm text-gray-500">Date: {new Date(order.created_at || order.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            Status: <span className="font-bold uppercase tracking-widest text-[10px] bg-gray-100 px-2 py-1">{order.status}</span>
          </p>
        </div>
      </div>

      {/* Bill To / Ship To */}
      <div className="flex justify-between mb-12">
        <div>
          <h3 className="font-label-md uppercase tracking-widest text-xs text-gray-500 font-bold mb-2">Billed To</h3>
          <p className="font-bold text-regal-navy">{order.shippingAddress?.firstName || order.user?.firstName} {order.shippingAddress?.lastName || order.user?.lastName}</p>
          <p className="text-sm text-gray-600">{order.shippingAddress?.email || order.user?.email}</p>
        </div>
        {order.shippingAddress && (
          <div className="text-right">
            <h3 className="font-label-md uppercase tracking-widest text-xs text-gray-500 font-bold mb-2">Shipped To</h3>
            <p className="text-sm text-gray-800">{order.shippingAddress.street}</p>
            <p className="text-sm text-gray-800">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p className="text-sm text-gray-800">{order.shippingAddress.country}</p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <table className="w-full text-left mb-8 border-collapse">
        <thead>
          <tr className="border-b-2 border-regal-navy">
            <th className="py-3 font-label-md uppercase text-xs tracking-widest font-bold">Item Description</th>
            <th className="py-3 text-center font-label-md uppercase text-xs tracking-widest font-bold">Qty</th>
            <th className="py-3 text-right font-label-md uppercase text-xs tracking-widest font-bold">Unit Price</th>
            <th className="py-3 text-right font-label-md uppercase text-xs tracking-widest font-bold">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {order.items?.map((item: any, i: number) => (
            <tr key={item.id || i}>
              <td className="py-4">
                <p className="font-bold text-gray-800">{item.product?.name || 'Unknown Product'}</p>
                {item.product?.sku && <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>}
              </td>
              <td className="py-4 text-center">{item.quantity}</td>
              <td className="py-4 text-right">₦{(item.priceAtPurchase || item.price || 0).toLocaleString()}</td>
              <td className="py-4 text-right font-bold">₦{((item.priceAtPurchase || item.price || 0) * item.quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="w-1/2 ml-auto">
        <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold">₦{(order.subtotal || 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-bold">₦{(order.shippingCost || 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
          <span className="text-gray-500">Tax</span>
          <span className="font-bold">₦{(order.tax || 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-4 mt-2 border-t-2 border-regal-navy">
          <span className="font-label-md uppercase tracking-widest font-bold text-regal-navy">Total Due</span>
          <span className="font-price-lg font-bold text-2xl text-regal-navy">₦{(order.total || 0).toLocaleString()}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500 italic mb-6">Thank you for your business.</p>
        <div className="flex justify-center gap-4 no-print flex-wrap">
          <button onClick={handleDownloadPDF} className="bg-metallic-gold text-regal-navy px-6 py-2 font-label-md uppercase tracking-widest font-bold text-xs hover:opacity-90 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF
          </button>
          <button onClick={() => window.print()} className="border border-regal-navy text-regal-navy px-6 py-2 font-label-md uppercase tracking-widest font-bold text-xs hover:bg-gray-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Invoice
          </button>
          <button onClick={() => window.close()} className="border border-gray-300 text-gray-600 px-6 py-2 font-label-md uppercase tracking-widest font-bold text-xs hover:bg-gray-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">close</span>
            Close
          </button>
        </div>
      </div>
      
      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          @page { margin: 1cm; }
        }
      `}} />
    </div>
  )
}
