import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateDress } from "../../api/dresses.api";
import { getCategories } from "../../api/categories.api";

export default function EditDressForm({ dress, onClose, onSuccess }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (dress && categories.length > 0) {
      // Ensure we find the correct ID if only name is present, but usually it's in .category or .category_id
      const categoryValue = dress.category_id || dress.category || "";
      
      setValue("code", dress.code || "");
      setValue("name", dress.name || "");
      setValue("category", categoryValue);
      setValue("color", dress.color || "");
      setValue("price", dress.price || "");
    }
  }, [dress, categories, setValue]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      const categoryList = Array.isArray(data) ? data : [];
      setCategories(categoryList);
    } catch (err) {
      console.log("Error loading categories:", err);
      setCategories([]);
    }
  };

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("color", data.color);
      formData.append("price", data.price);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await updateDress(dress.id, formData);
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating dress:", error);
      alert("Failed to update piece.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] w-full max-w-[500px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] border border-white relative overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="space-y-4 mb-8 text-center">
        <p className="text-[10px] font-black tracking-[0.3em] text-pink-400 uppercase">Modification</p>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Edit <span className="text-pink-400">Inventory</span> Item</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Serial Code</label>
            <input
              {...register("code", { required: true })}
              placeholder="#PRO-2024"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Update Price (₹)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="0"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Design Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Silk Evening Gown"
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Category</label>
            <select 
              {...register("category", { required: true })} 
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Updated Color</label>
            <input
              {...register("color", { required: true })}
              placeholder="Midnight Navy"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Replace Visual Media <span className="font-normal normal-case italic opacity-60 ml-1">(Optional)</span></label>
          <input
            type="file"
            {...register("image")}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[9px] file:font-black file:uppercase file:bg-pink-100 file:text-pink-600 hover:file:bg-pink-200 transition-all outline-none cursor-pointer"
          />
        </div>

        <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] py-4 bg-slate-900 hover:bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-slate-200 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving Changes..." : "Save Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
