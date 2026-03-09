import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createDress } from "../api/dresses.api";
import { getCategories } from "../api/categories.api";

export default function AddDressModal({ closeModal, refresh }) {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("color", data.color);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);

      await createDress(formData);

      refresh();
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Dress</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          <input
            {...register("code")}
            placeholder="Dress Code"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            {...register("name")}
            placeholder="Dress Name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <select
            {...register("category")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option>Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            {...register("color")}
            placeholder="Color"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="file"
            {...register("image")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-3 py-1.5 text-sm border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Save Dress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}