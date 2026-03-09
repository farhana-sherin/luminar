import React from "react";

export default function Card() {
  const isBooked = true;

  const dress = [
    "https://i.pinimg.com/736x/15/2f/63/152f634b001f07bbd20a2b9d3d06cf1e.jpg",
    "https://i.pinimg.com/736x/2e/ea/3f/2eea3fbec4d64bd52782460217f1504c.jpg",
    "https://i.pinimg.com/736x/fc/d8/16/fcd816a8196f2c5efed09eb6a8575baa.jpg"
  ];

  return (
    <div className="min-h-screen flex flex-wrap gap-8 items-center justify-center p-10">

      {dress.map((img, index) => (
        <div
          key={index}
          className="w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >

          {/* Image */}
          <div className="relative">
            <img
              src={img}
              alt="dress"
              className="w-full h-56 object-cover"
            />

            {/* badges */}
            <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
              Rent
            </span>

            {isBooked && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Booked
              </span>
            )}

            {isBooked && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white text-sm font-semibold">
                  Not Available
                </p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-gray-800 font-semibold text-sm">
              Bridal Party Dress
            </h3>

            <p className="text-gray-500 text-xs mt-1">
              Sizes: S • M • L
            </p>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  ₹1500
                </p>
                <p className="text-gray-400 text-xs">
                  per day
                </p>
              </div>

              <button
                disabled={isBooked}
                className={`text-xs px-3 py-1.5 rounded-md ${
                  isBooked
                    ? "bg-gray-300 text-gray-500"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isBooked ? "Booked" : "Rent"}
              </button>
            </div>
          </div>

        </div>
      ))}

    </div>
  );
}