import React, { useEffect, useState } from "react";
import dressesApiCall from "../../api/dresses.api";
import AddDressForm from "./AddDressForm";


export default function Dresses() {
  const [dresses, setDresses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const fetchDresses = async () => {
    try {
      const response = await dressesApiCall();

      setDresses(response);

      const uniqueCategories = [
        "All",
        ...new Set(response.map((item) => item.category_name)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDresses();
  }, []);

  const filteredDresses =
    activeCategory === "All"
      ? dresses
      : dresses.filter((d) => d.category_name === activeCategory);

  const handleDelete = (id) => {
    setDresses(dresses.filter((dress) => dress.id !== id));
  };

  const handleEdit = (dress) => {
    console.log("Edit dress:", dress);
  };

  return (
    <section className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800">Dresses</h1>

        {/* Add Dress Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded hover:bg-slate-800"
        >
          + Add Dress
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-1 text-[11px] font-medium rounded
              ${
                activeCategory === cat
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Dress Modal */}
      {showForm && (
        <AddDressForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchDresses}
        />
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {filteredDresses.map((dress) => (
          <article
            key={dress.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            {/* Image */}
            <div className="h-32 overflow-hidden bg-slate-100">
              <img
                src={`http://127.0.0.1:8000${dress.image}`}
                alt={dress.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-2 space-y-1">
              <h3 className="text-xs font-semibold text-slate-800 truncate">
                {dress.name}
              </h3>

              <p className="text-[11px] text-slate-500">
                {dress.category_name}
              </p>

              <p className="text-[11px] text-slate-500">
                {dress.color}
              </p>

              <p className="text-xs font-semibold text-slate-900">
                ₹ {dress.price}
              </p>

              {/* Buttons */}
              <div className="flex gap-1 pt-1">
                <button
                  onClick={() => handleEdit(dress)}
                  className="flex-1 bg-gray-600 text-white text-[10px] py-1 rounded hover:bg-gray-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(dress.id)}
                  className="flex-1 bg-black text-white text-[10px] py-1 rounded hover:bg-gray-400"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}