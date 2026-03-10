import axios from "../lib/axios";

export const getOrders = async (page = 1) => {
  try {
    const { data } = await axios.get(`/bookings/history/?page=${page}`);
    return data; // { count, total_pages, current_page, results }
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getRecentOrders = async (limit = 5) => {
  const data = await getOrders(1);
  return (data?.results || []).slice(0, limit);
};

