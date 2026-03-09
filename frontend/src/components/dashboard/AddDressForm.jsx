import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createDress } from "../../api/dresses.api";
import { getCategories } from "../../api/categories.api";

export default function AddDressForm({ onClose, onSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
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

      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl w-[400px] space-y-4"
      >
        <h2 className="text-lg font-semibold">Add Dress</h2>

        <input
          {...register("code")}
          placeholder="Code"
          className="border p-2 w-full rounded"
        />

        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 w-full rounded"
        />

        <select {...register("category")} className="border p-2 w-full rounded">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          {...register("color")}
          placeholder="Color"
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          {...register("image")}
          className="border p-2 w-full rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-black text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}