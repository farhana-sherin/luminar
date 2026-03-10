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