import axios from "../lib/axios";

export default async function dressesApiCall() {
  try {
    const res = await axios.get(`/dresses/list/?t=${Date.now()}`);
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    console.warn("Unexpected API response format:", res.data);
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getDressDetail = async (id) => {
  try {
    const res = await axios.get(`/dresses/${id}/`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDress = async (formData) => {
  const { data } = await axios.post("/dresses/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateDress = async (id, formData) => {
  const { data } = await axios.put(`/dresses/update/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteDress = async (id) => {
  const { data } = await axios.delete(`/dresses/delete/${id}/`);
  return data;
};