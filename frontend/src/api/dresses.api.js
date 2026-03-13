import axios from "../lib/axios";

export default async function dressesApiCall() {
  try {
    const res = await axios.get(`/dresses/list/?t=${Date.now()}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
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