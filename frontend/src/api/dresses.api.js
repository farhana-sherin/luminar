import axios from "../lib/axios";

export default async function dressesApiCall() {
  try {
    const res = await axios.get("/dresses/list/");
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createDress = async (formData) => {
  const { data } = await axios.post("/dresses/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};