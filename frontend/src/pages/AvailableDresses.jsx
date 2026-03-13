import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { getAvailableDresses } from "../api/booking.api";

export default function AvailableDresses() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    results: [],
    current_page: 1,
    total_pages: 1,
    count: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const fetchPage = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAvailableDresses(page);

      setData({
        results: res.results || [],
        current_page: Number(res.current_page) || 1,
        total_pages: Number(res.total_pages) || 1,
        count: res.count || 0,
      });

      setError("");
    } catch {
      setError("Unable to load available dresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > data.total_pages) return;
    fetchPage(nextPage);
  };

  /* Extract categories from API */
  const categories = [
    "All",
    ...Array.from(new Set(data.results.map((d) => d.category).filter(Boolean))),
  ];

  /* Filtering */
  const filteredDresses = data.results.filter((dress) => {
    const matchesSearch =
      searchTerm === "" ||
      dress.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dress.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dress.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || dress.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* Header */}
        <section className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-slate-400 mb-3">
                Inventory
              </p>

              <h1 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tight">
                Available <span className="italic text-pink-400 font-normal">Dresses</span>
              </h1>

              <p className="mt-3 text-sm text-slate-500 max-w-sm">
                Dresses that are currently not booked and ready for the next customer.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4">
              <Sparkles className="text-pink-500" size={20} />

              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-pink-400">
                  Available Now
                </p>

                <p className="text-xl font-serif text-pink-600 mt-1">
                  {data.count}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Dresses Section */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8">

          {/* Filter + Search */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">

            {/* Category Dropdown */}
            <div className="relative">

              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="px-5 py-3 bg-pink-50 border border-pink-100 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-pink-100 transition"
              >
                Category: {selectedCategory} ▾
              </button>

              {showCategoryDropdown && (
                <div className="absolute mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20">

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-pink-50"
                    >
                      {cat}
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">

              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dress code, category, name..."
                className="w-full pl-4 pr-4 py-3.5 bg-pink-50 border border-pink-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-pink-100"
              />

            </div>

          </div>

          {error && (
            <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-sm font-semibold text-rose-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center text-sm text-slate-400">
              Loading available dresses...
            </div>
          ) : filteredDresses.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-400">
              No dresses match your filters.
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">

              {filteredDresses.map((dress) => (

                <article
                  key={dress.id}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >

                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">

                    <img
                      src={`http://127.0.0.1:8000${dress.image}`}
                      alt={dress.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-semibold uppercase tracking-widest text-slate-700 shadow-sm">
                      {dress.category}
                    </span>

                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">

                    <h2 className="text-lg font-semibold text-slate-900 truncate">
                      {dress.name}
                    </h2>

                    <p className="text-xs text-slate-500">
                      Code: <span className="font-mono">{dress.code || "N/A"}</span>
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">

                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                          Price
                        </span>

                        <span className="text-base font-semibold text-pink-500">
                          ₹{Number(dress.price).toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/dress/${dress.id}`)}
                        className="bg-slate-900 hover:bg-black text-white px-3.5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] transition-all transform hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap"
                      >
                        Book Now
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

          {/* Pagination */}
          {data.total_pages > 1 && (
            <div className="flex items-center justify-between mt-6 text-xs text-slate-500">

              <button
                onClick={() => handlePageChange(data.current_page - 1)}
                disabled={data.current_page <= 1}
                className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span>
                Page {data.current_page} of {data.total_pages}
              </span>

              <button
                onClick={() => handlePageChange(data.current_page + 1)}
                disabled={data.current_page >= data.total_pages}
                className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>

            </div>
          )}

        </section>
      </div>
    </div>
  );
}