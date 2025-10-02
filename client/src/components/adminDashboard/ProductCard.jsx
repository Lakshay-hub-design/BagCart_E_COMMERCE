import React from "react";

const ProductCard = ({ product, isAdmin, onDelete, onEdit }) => {

  return (
    <div className="bg-gray-50 shadow rounded-lg overflow-hidden">
      <div className="p-2" style={{ backgroundColor: product.bgcolor }}>
        <img
          src={product.image}
          alt={product.name}
          className="h-34 m-auto object-cover rounded"
        />
      </div>
      <div className="p-2" style={{backgroundColor: product.panelcolor, color: product.textcolor}}>
        <h3 className="font-bold mt-2 truncate">{product.name}</h3>
        <p>₹{product.price}</p>
      

      {isAdmin && (
        <div className="flex justify-between mt-2">
          <button onClick={onEdit} className="text-blue-500 cursor-pointer">Edit</button>
          <button onClick={onDelete} className="text-red-500 cursor-pointer">Delete</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductCard;
