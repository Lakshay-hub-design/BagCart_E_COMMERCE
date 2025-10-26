import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="py-20 md:py-32 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white"
    >
      <div className="container mx-auto px-4 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Find Your Perfect Bag <br />
            For{' '}
            <span className="text-[#2563EB]">Every Adventure</span>
          </h1>
          <p className="text-gray-300 max-w-lg mx-auto md:mx-0">
            Explore our new collection of trendy backpacks, handbags, and travel
            gear. Crafted with high-quality, water-resistant materials for
            ultimate fashion and durability.
          </p>

          {/* CTA Button */}
          <div className="pt-4 flex justify-center md:justify-start">
            <a
              href="#products"
              className="bg-[#2563EB] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#1E40AF] hover:scale-105 transform transition-all shadow-lg"
            >
              Explore Collection <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          {/* Decorative background */}
          <div className="absolute w-4/5 h-4/5 bg-[#1E293B] rounded-3xl transform -rotate-6"></div>
          <img
            src="/images/heroImage.png"
            alt="Stylish Blue Backpack"
            className="relative max-w-sm md:max-w-md z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
