import React, { useEffect, useRef, useState } from 'react'

const ProductCrousel = () => {
    const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const products = [
    { name: "Duffle Bag", img: "https://ik.imagekit.io/lucky0328/96d91d1c-4c7f-434b-8e85-a9310e98df13_1WsmNWvXN?updatedAt=1758871263239", price: 800, stars: 4 },
    { name: "BlueBand Backpack", img: "https://ik.imagekit.io/lucky0328/03ad59f4-606a-4108-9836-6b7ac9c16908_t5Yn6ZWy7?updatedAt=1759237350718", price: 1000, stars: 5 },
    { name: "Hand Bag", img: "https://ik.imagekit.io/lucky0328/5111a64b-6055-4293-aa81-08bbb910f0ef_94M59SQ-J?updatedAt=1761492145657", price: 600, stars: 4.5 },
    { name: "Travel Bag", img: "https://ik.imagekit.io/lucky0328/d6604fcc-6e79-4572-8bc6-b1b160ea3afb_J0sSJyhFB?updatedAt=1761491923182", price: 1000, stars: 5 },
    { name: "Laptop Bag", img: "https://ik.imagekit.io/lucky0328/9488401e-8746-44b2-927e-28ace5fe005c_zJfDLE3oA?updatedAt=1758872499220", price: 1300, stars: 4.5 },
    { name: "Pink Attack", img: "https://ik.imagekit.io/lucky0328/add33ed1-6556-4046-8787-eddbd6964945_cY2Ahq0Ud?updatedAt=1758699446228", price: 1400, stars: 5 },
    { name: "Training Duffle Bag", img: "https://ik.imagekit.io/lucky0328/0b5facdc-2e4b-4f9f-8567-7dcaa4b82e96_zE4d5nkvv?updatedAt=1758871516060", price: 600, stars: 5 },
  ]; 
console.log(products)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (current < products.length - itemsPerPage) setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const offset = sliderRef.current
    ? current * (sliderRef.current.children[0].offsetWidth + 32)
    : 0;
  return (
    <section id="products" className="bg-brand-light py-20 text-gray-900">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold">Discover Our Latest Products</h2>
            <p className="text-gray-500">Handpicked items from our new arrivals.</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prev}
              disabled={current === 0}
              className="bg-white border border-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button
              onClick={next}
              disabled={current >= products.length - itemsPerPage}
              className="bg-[#0F172A] w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-blue-950 disabled:opacity-50"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out gap-8 overflow-hidde"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {products.map((p, i) => (
              <div
                key={i}
                className="group bg-white rounded-lg shadow-lg overflow-hidden mt-4 transform hover:-translate-y-2 transition-transform flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <img src={p.img} alt={p.name} className="h-[80%] w-[65%] object-contain" />
                </div>
                <div className="p-6 text-gray-800">
                  <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-2xl font-bold text-brand-blue mr-3">
                      ₹{p.price}
                    </span>
                    <div className="text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`${
                            i < Math.floor(p.stars)
                              ? "fas fa-star"
                              : i < p.stars
                              ? "fas fa-star-half-alt"
                              : "far fa-star"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => (window.location.href = "/user?form=login")}
                    className="w-full bg-brand-navy text-white font-semibold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCrousel