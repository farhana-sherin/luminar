import React, { useEffect, useState } from "react";
import dressesApiCall, { deleteDress } from "../../api/dresses.api";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../api/categories.api";

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

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchDresses = async () => {
    try {
      const response = await dressesApiCall();

      const fetchTime = Date.now();

      const dressesWithCacheBuster = response.map(dress => ({
        ...dress,
        imageWithCacheBust: `${dress.image}?t=${fetchTime}`
      }));

      setDresses(dressesWithCacheBuster);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDress(id);
      fetchDresses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async () => {

    if (!newCategory.trim()) return;

    try {
      await createCategory({ name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCategory = async () => {

    if (!editingCategory?.name.trim()) return;

    try {

      await updateCategory(editingCategory.id, {
        name: editingCategory.name
      });

      setEditingCategory(null);

      fetchCategories();

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchDresses();
    fetchCategories();

  }, []);

  const filteredDresses = dresses
    .filter((d) =>
      activeCategory === "All"
        ? true
        : d.category_name === activeCategory
    )
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );

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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm"
              />

            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-8 py-3 bg-pink-300 hover:bg-pink-400 text-white rounded-2xl text-sm font-semibold"
            >
              <Plus size={18} />
              New Arrival
            </button>

          </div>

        </div>

        {/* Category Manager */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">

          <div className="flex items-center gap-3 mb-4">

            <input
              type="text"
              placeholder="New category..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm"
            />

            <button
              onClick={handleCreateCategory}
              className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-xl text-sm"
            >
              Add Category
            </button>

          </div>

          <div className="flex flex-wrap gap-3">

            {categories.map((cat) => (

              <div
                key={cat.id}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >

                {editingCategory?.id === cat.id ? (

                  <>
                    <input
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          name: e.target.value
                        })
                      }
                      className="px-2 py-1 border rounded text-sm"
                    />

                    <button
                      onClick={handleUpdateCategory}
                      className="px-2 py-1 text-xs bg-green-100 rounded"
                    >
                      Save
                    </button>
                  </>

                ) : (

                  <span className="text-sm font-medium text-slate-700">
                    {cat.name}
                  </span>

                )}

                {!editingCategory && (
                  <button
                    onClick={() =>
                      setEditingCategory({
                        id: cat.id,
                        name: cat.name
                      })
                    }
                    className="p-1 hover:bg-purple-100 rounded"
                  >
                    <Edit3 size={14} className="text-purple-600" />
                  </button>
                )}

                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4">

          <button
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-2.5 rounded-2xl text-sm font-medium ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-slate-700 shadow-md scale-105"
                : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (

            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium ${
                activeCategory === cat.name
                  ? "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-slate-700 shadow-md scale-105"
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>

          ))}

        </div>

        {/* Dresses Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">

          {filteredDresses.map((dress) => (
            <div key={dress.id} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
              {/* Image Section */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                <img
                  src={dress.imageWithCacheBust}
                  alt={dress.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Action Dock (Fixed on top right) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <button
                    onClick={() => setEditDress(dress)}
                    className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:bg-pink-400 hover:text-white transition-all shadow-lg border border-white/50"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(dress.id)}
                    className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg border border-white/50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                {/* Category Floating Badge */}
                
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/20">
                    {dress.category_name}
                  </span>
                </div>
              </div>

              {/* Info Section (Metadata) */}

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-pink-400 transition-colors uppercase tracking-tight text-lg truncate">
                      {dress.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-1">
                      REF: {dress.code || "---"}
                    </p>
                  </div>
                  <div className="text-right">
                    
                    <p className="text-xl font-black text-slate-900">
                      ₹{Number(dress.price).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="w-2.5 h-2.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: dress.color }}></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{dress.color}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>

      {showForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <AddDressForm
            onClose={() => setShowForm(false)}
            onSuccess={fetchDresses}
          />
        </div>
      )}

      {editDress && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <EditDressForm
            dress={editDress}
            onClose={() => setEditDress(null)}
            onSuccess={fetchDresses}
          />
        </div>
      )}

    </div>
  );
}