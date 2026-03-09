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