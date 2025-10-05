import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-white shadow rounded overflow-hidden animate-pulse"
        >
          {/* Image section */}
          <div className="h-40 bg-gray-200"></div>

          {/* Text + button area */}
          <div className="p-3 flex justify-between items-center">
            <div className="space-y-2 w-3/4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-6 w-6 md:h-8 md:w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
