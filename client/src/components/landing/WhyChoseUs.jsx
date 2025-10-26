import React from 'react'

const WhyChoseUs = () => {
     const features = [
    {
      icon: "fa-check-circle",
      title: "Premium Quality",
      desc: "Only the finest materials, built to withstand your daily grind.",
    },
    {
      icon: "fa-star",
      title: "Stylish Designs",
      desc: "Modern and timeless styles to complement any look.",
    },
    {
      icon: "fa-shield-alt",
      title: "Durable & Strong",
      desc: "Water-resistant fabrics and reinforced stitching for longevity.",
    },
    {
      icon: "fa-shipping-fast",
      title: "Fast Shipping",
      desc: "Get your new favorite bag delivered to your door in no time.",
    },
  ];

  return (
    <section id="aboutus" className="bg-brand-navy py-20 text-center">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-2">Why Choose BagCart?</h2>
        <p className="text-gray-200 mb-12 max-w-2xl text-[16px] mx-auto">
          We focus on what matters: durable materials, functional design, and
          impeccable style.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-800 p-8 rounded-lg">
              <i className={`fas ${f.icon} text-brand-blue text-4xl mb-4`}></i>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoseUs