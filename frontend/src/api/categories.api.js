import axios from "../lib/axios";

export async function getCategories() {
  try {
    const { data } = await axios.get("/categories/list/");
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


// CREATE CATEGORY
export async function createCategory(categoryData) {
  try {
    const { data } = await axios.post("/categories/create/", categoryData);
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}


// UPDATE CATEGORY
export async function updateCategory(categoryId, categoryData) {
  try {
    const { data } = await axios.put(`/categories/update/${categoryId}/`, categoryData);
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}


// DELETE CATEGORY
export async function deleteCategory(categoryId) {
  try {
    const { data } = await axios.delete(`/categories/delete/${categoryId}/`);
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}