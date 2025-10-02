import React from "react";

const StatsCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatsCard;
