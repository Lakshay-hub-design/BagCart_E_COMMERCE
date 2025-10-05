import React, { Suspense } from "react";
import Navbar from "../../components/shop/NavBar";
import Footer from "../../components/shop/Footer";

const Slider = React.lazy(() => import("../../components/shop/Slider"));
const ShopContent = React.lazy(() => import("../../components/shop/ShopPage"));

const Shop = () => {
  return (
    <div>
      <Navbar />

      <Suspense fallback={<div className="h-40 bg-gray-200 animate-pulse"></div>}>
        <Slider />
      </Suspense>

      <Suspense >
        <ShopContent />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Shop;
