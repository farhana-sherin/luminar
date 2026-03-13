import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateDress } from "../../api/dresses.api";
import { getCategories } from "../../api/categories.api";

export default function EditDressForm({ dress, onClose, onSuccess }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
        if (dress) {
            setValue("code", dress.code || "");
            setValue("name", dress.name || "");
            setValue("category", dress.category || dress.category_id || ""); // using category if available, backend will need ID
            setValue("color", dress.color || "");
            setValue("price", dress.price || "");
        }
    }, [dress, setValue]);

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

            if (data.image && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }

            await updateDress(dress.id, formData);

            reset();
            onSuccess();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl w-[400px] space-y-4 shadow-xl"
            >
                <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Edit Dress</h2>

                <div className="space-y-3 pt-2">
                    <input
                        {...register("code")}
                        placeholder="Code"
                        className="border border-slate-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    />

                    <input
                        {...register("name")}
                        placeholder="Name"
                        className="border border-slate-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    />

                    <select
                        {...register("category")}
                        className="border border-slate-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    >
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
                        className="border border-slate-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    />

                    <input
                        type="number"
                        step="0.01"
                        {...register("price")}
                        placeholder="Price"
                        className="border border-slate-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    />

                    <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                            Update Image <span className="font-normal">(Leave empty to keep current)</span>
                        </label>
                        <input
                            type="file"
                            {...register("image")}
                            className="border border-slate-200 p-2 w-full rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 flex-1 bg-slate-100/80 hover:bg-slate-200 text-slate-700 transition rounded-lg text-sm font-semibold"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 flex-1 bg-black hover:bg-slate-800 text-white shadow-md transition rounded-lg text-sm font-semibold"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
