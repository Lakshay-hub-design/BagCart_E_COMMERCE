import React from 'react'

const Footer = () => {
  return (
     <footer id="contact" className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <a
              href="#"
              className="text-3xl font-bold tracking-wider text-white mb-4 inline-block"
            >
              BagCart
            </a>
            <p className="max-w-xs">
              Your one-stop shop for high-quality, stylish, and durable bags for
              every occasion.
            </p>
            <div className="flex space-x-4 mt-6">
              {["facebook-f", "instagram", "twitter", "pinterest"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className={`fab fa-${icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-blue">Home</a></li>
              <li><a href="#about" className="hover:text-brand-blue">About Us</a></li>
              <li><a href="#products" className="hover:text-brand-blue">Products</a></li>
              <li><a href="#" className="hover:text-brand-blue">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <p>123 Bag Street,<br />Fashion City, 10101</p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:support@bagcart.com"
                className="hover:text-brand-blue"
              >
                support@bagcart.com
              </a>
            </p>
            <p className="mt-1">
              Phone:{" "}
              <a href="tel:+911234567890" className="hover:text-brand-blue">
                +91 12345 67890
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 BagCart. All Rights Reserved. Designed with passion.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer