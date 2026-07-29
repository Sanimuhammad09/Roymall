export function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/+23408136563976"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-8 h-8 fill-current"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 .2-5.5 2.8-8.3 2.1-2.3 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.5-9.3 1.9-3.7 .9-7-5.5-12.5s-28.2-68-38.6-93.1c-10.2-24.5-20.6-21.2-28.2-21.6-7-.4-15.3-.4-23.7-.4-8.3 0-21.8 3.2-33.4 16.2-11.6 13-44.5 43.5-44.5 106.1s45.5 123.1 51.9 131.5c6.5 8.3 89.6 136.9 217.1 191.9 30.3 13.1 53.9 20.9 72.3 26.8 30.4 9.7 58.1 8.3 80 5 24.3-3.6 74.8-30.6 85.5-60.2 10.6-29.6 10.6-55 7.4-60.2-3.1-5.1-11.5-8-17-10.7z"/>
      </svg>
      <div className="absolute right-full mr-4 bg-white text-gray-800 text-sm py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Admin
      </div>
    </a>
  );
}
