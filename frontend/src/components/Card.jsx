import React from "react";

export default function Card() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-10">

      <div className="bg-white w-64 rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition duration-300">

        {/* Image */}
        <div className="relative overflow-hidden bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03"
            alt="dress"
            className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
          />

          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition"></div>
        </div>

        {/* Content */}
        <div className="p-4 flex justify-between items-center">

          <div>
            <h3 className="text-gray-800 font-semibold text-sm">
              Muria Vest
            </h3>
            <p className="text-gray-500 text-sm">$12.99</p>
          </div>

          {/* cart button */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            🛒
          </button>

        </div>

      </div>

    </div>
  );
}