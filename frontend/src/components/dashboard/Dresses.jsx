import React, { useEffect, useState } from "react";
import dressesApiCall, { deleteDress } from "../../api/dresses.api";
import AddDressForm from "./AddDressForm";
import EditDressForm from "./EditDressForm";
import { Plus, Search, Trash2, Edit3 } from "lucide-react";

export default function Dresses() {
  const [dresses, setDresses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editDress, setEditDress] = useState(null);

  const fetchDresses = async () => {
    try {
      const response = await dressesApiCall();
      const fetchTime = Date.now();
      const dressesWithCacheBuster = response.map(dress => ({
        ...dress,
        imageWithCacheBust: `${dress.image}?t=${fetchTime}`
      }));
      setDresses(dressesWithCacheBuster);

      const uniqueCategories = [
        "All",
        ...new Set(response.map((item) => item.category_name)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDress(id);
      await fetchDresses();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDresses();
  }, []);

  const filteredDresses = dresses
    .filter((d) =>
      activeCategory === "All" ? true : d.category_name === activeCategory
    )
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-pink-400">
              Dress Collection
            </h1>

            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Manage your premium inventory, prices, and categories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-300 transition-colors"
                size={18}
              />

              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-pink-300 hover:bg-pink-400 text-white rounded-2xl text-sm font-semibold transition-all shadow-md hover:shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span>New Arrival</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                ? "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-slate-700 shadow-md scale-105"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredDresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-100 border-dashed">

            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="text-slate-400" size={32} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No dresses found
            </h3>

            <p className="text-slate-500 mt-2 text-center max-w-sm">
              We couldn't find any items matching your current filters.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">

            {filteredDresses.map((dress) => (
              <div
                key={dress.id}
                className="group relative flex flex-col rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-100 aspect-[3/4]"
              >

                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={`http://127.0.0.1:8000${dress.imageWithCacheBust}`}
                    alt={dress.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                </div>

                {/* Top */}
                <div className="absolute top-0 inset-x-0 p-5 flex justify-between items-start z-10">

                  <span className="px-3 py-1 bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {dress.category_name}
                  </span>

                  <div className="flex flex-col gap-2">
                  <button
  onClick={() => setEditDress(dress)}
  className="p-2.5 bg-white text-slate-900 hover:bg-purple-200 hover:text-purple-800 rounded-full shadow-xl transition-colors"
>
  <Edit3 size={16} />
</button>

<button
  onClick={() => handleDelete(dress.id)}
  className="p-2.5 bg-white text-slate-900 hover:bg-red-200 hover:text-red-700 rounded-full shadow-xl transition-colors"
>
  <Trash2 size={16} />
</button>
                  </div>

                </div>

                {/* Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                    <h3 className="font-semibold text-xl md:text-2xl text-white leading-snug drop-shadow-md line-clamp-2 mb-3">
                      {dress.name}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/20">

                      <div className="flex flex-col gap-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-1">
                            Code
                          </span>
                          <span className="text-sm font-mono text-white/90 drop-shadow">
                            {dress.code || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold">
                            Color
                          </span>
                          {dress.color && (
                            <span className="inline-flex items-center gap-2 text-xs text-white/90">
                              <span
                                className="inline-block h-3 w-3 rounded-full border border-white/40"
                                style={{ backgroundColor: dress.color }}
                              />
                              {dress.color}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-1 block">
                          Price
                        </span>

                        <p className="font-bold text-lg md:text-xl text-white drop-shadow-md">
                          ₹{dress.price.toLocaleString()}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {showForm && (
        <AddDressForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchDresses}
        />
      )}

      {editDress && (
        <EditDressForm
          dress={editDress}
          onClose={() => setEditDress(null)}
          onSuccess={fetchDresses}
        />
      )}
    </div>
  );
}