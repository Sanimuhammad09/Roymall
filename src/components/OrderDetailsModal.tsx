import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function OrderDetailsModal({
  isOpen,
  orderId,
  onClose
}: {
  isOpen: boolean;
  orderId: string | null;
  onClose: () => void;
}) {
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  const { data: orderResponse, isLoading, error } = useQuery({
    queryKey: ['order-details', orderId, isAdmin],
    queryFn: () => {
      if (!orderId) return null;
      return isAdmin ? api.adminGetOrder(orderId) : api.getOrderById(orderId);
    },
    enabled: !!orderId
  });

  if (!isOpen || !orderId) return null;

  const order = orderResponse?.data || orderResponse;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-regal-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white border border-metallic-gold/30 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
          <div>
            <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-regal-navy">Order {order?.orderNumber || 'Details'}</h3>
            <p className="text-xs sm:text-sm font-label-md uppercase tracking-widest text-gray-500 mt-1">
              {order ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Loading...'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {orderId && (
              <a 
                href={`/invoice/${orderId}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 font-label-md uppercase tracking-widest text-xs text-metallic-gold border border-metallic-gold px-4 py-2 hover:bg-metallic-gold hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                Invoice
              </a>
            )}
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-500 hover:text-regal-navy hover:border-regal-navy transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-8 overflow-y-auto no-scrollbar flex-grow bg-white">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-metallic-gold">
              <span className="material-symbols-outlined animate-spin text-5xl mb-4">progress_activity</span>
              <p className="font-label-md uppercase tracking-widest text-sm text-regal-navy">Retrieving Order Details...</p>
            </div>
          ) : error || !order ? (
            <div className="text-center py-20 text-red-500">
              <span className="material-symbols-outlined text-5xl mb-4">error</span>
              <p className="font-label-md uppercase tracking-widest">Failed to load order details</p>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* Status Banner */}
              <div className={`p-4 border-l-4 flex items-center justify-between ${
                order.status === 'DELIVERED' ? 'border-l-green-500 bg-green-50 text-green-800' :
                order.status === 'SHIPPED' ? 'border-l-blue-500 bg-blue-50 text-blue-800' :
                order.status === 'CANCELLED' ? 'border-l-red-500 bg-red-50 text-red-800' :
                'border-l-metallic-gold bg-metallic-gold/10 text-regal-navy'
              }`}>
                <div>
                  <span className="font-label-md text-xs uppercase tracking-widest font-bold opacity-70">Current Status</span>
                  <p className="font-headline-md font-bold text-lg mt-1">{order.status}</p>
                </div>
                {order.status === 'DELIVERED' && <span className="material-symbols-outlined text-3xl opacity-50">task_alt</span>}
                {order.status === 'PENDING' && <span className="material-symbols-outlined text-3xl opacity-50">pending_actions</span>}
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-label-md text-xs uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-2 mb-6">Purchased Items</h4>
                <div className="space-y-6">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                      <div className="flex gap-4 sm:gap-6 flex-grow items-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 border border-gray-100 flex-shrink-0">
                          {item.product?.images?.[0] ? (
                            <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <span className="material-symbols-outlined text-3xl">image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h5 className="font-headline-md font-bold text-regal-navy text-base sm:text-lg truncate">{item.product?.name || 'Unknown Product'}</h5>
                          <p className="text-xs sm:text-sm text-gray-500 font-body-md mt-1">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right mt-2 sm:mt-0 pl-24 sm:pl-0">
                        <p className="font-price-lg font-bold text-regal-navy text-base sm:text-lg">₦{(item.priceAtPurchase * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400 font-label-md mt-1">₦{item.priceAtPurchase.toLocaleString()} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-100">
                <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200">
                  <h4 className="font-label-md text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">local_shipping</span> Shipping Address
                  </h4>
                  {order.shippingAddress ? (
                    <div className="font-body-md text-regal-navy space-y-1 text-sm sm:text-base">
                      <p className="font-bold">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                      {order.shippingAddress.phone && <p className="pt-2 text-xs sm:text-sm text-gray-600">Phone: {order.shippingAddress.phone}</p>}
                      {order.shippingAddress.email && <p className="text-xs sm:text-sm text-gray-600">Email: {order.shippingAddress.email}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic text-sm">No shipping details provided</p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200">
                  <h4 className="font-label-md text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">receipt_long</span> Order Summary
                  </h4>
                  <div className="space-y-3 font-body-md text-regal-navy">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₦{(order.subtotal || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>₦{(order.shippingCost || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>₦{(order.tax || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 mt-3 text-metallic-gold">
                      <span>Total Amount</span>
                      <span>₦{(order.totalAmount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
