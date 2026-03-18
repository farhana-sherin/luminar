import axios from "../lib/axios";

export const getOrders = async (page = 1) => {
  try {
    const { data } = await axios.get(`/bookings/history/?page=${page}`);
    return (data && typeof data === 'object' && Array.isArray(data.results)) ? data : { count: 0, total_pages: 1, current_page: 1, results: [] };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { count: 0, total_pages: 1, current_page: 1, results: [] };
  }
};

export const getRecentOrders = async (limit = 5) => {
  const data = await getOrders(1);
  return (data?.results || []).slice(0, limit);
};

export const getOrdersSummary = async () => {
  const firstPage = await getOrders(1);

  const totalPages = Number(firstPage.total_pages) || 1;
  let allResults = firstPage.results || [];

  if (totalPages > 1) {
    const promises = [];
    for (let page = 2; page <= totalPages; page += 1) {
      promises.push(getOrders(page));
    }
    const otherPages = await Promise.all(promises);
    otherPages.forEach((p) => {
      if (p?.results) {
        allResults = allResults.concat(p.results);
      }
    });
  }

  const totalBookings = firstPage.count || allResults.length;
  const completedOrders = allResults.filter((o) => o.status === "Returned").length;
  const activeOrders = allResults.filter((o) => o.status === "Confirmed").length;

  return {
    totalBookings,
    activeOrders,
    completedOrders,
  };
};


