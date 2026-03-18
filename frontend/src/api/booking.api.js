import axios from "../lib/axios";

export const getBookings = async () => {
  try {
    const { data } = await axios.get("/bookings/list/");
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const { data } = await axios.post("/bookings/create/", bookingData);
    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const { data } = await axios.delete(`/bookings/delete/${id}/`);
    return data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const getBookingDetail = async (id) => {
  try {
    const { data } = await axios.get(`/bookings/booking/${id}/`);
    return data;
  } catch (error) {
    console.error("Error fetching booking detail:", error);
    throw error;
  }
};

export const getBookedDresses = async (page = 1) => {
  try {
    const { data } = await axios.get(`/bookings/booked-dresses/?page=${page}`);
    return (data && typeof data === 'object' && Array.isArray(data.results)) ? data : { count: 0, total_pages: 1, current_page: 1, results: [] };
  } catch (error) {
    console.error("Error fetching booked dresses:", error);
    return { count: 0, total_pages: 1, current_page: 1, results: [] };
  }
};

export const getAvailableDresses = async (page = 1) => {
  try {
    const { data } = await axios.get(`/bookings/available-dresses/?page=${page}`);
    return (data && typeof data === 'object' && Array.isArray(data.results)) ? data : { count: 0, total_pages: 1, current_page: 1, results: [] };
  } catch (error) {
    console.error("Error fetching available dresses:", error);
    return { count: 0, total_pages: 1, current_page: 1, results: [] };
  }
};

export const markBookingReturned = async (bookingId) => {
  try {
    const { data } = await axios.post("/bookings/return/", {
      booking_id: bookingId,
    });
    return data;
  } catch (error) {
    console.error("Error marking booking as returned:", error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const { data } = await axios.post(`/bookings/cancel/${id}/`);
    return data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    const { data } = await axios.patch(`/bookings/update/${id}/`, bookingData);
    return data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};
export const getReturnReminders = async (page = 1) => {
  try {
    const { data } = await axios.get(`/bookings/return-reminder/?page=${page}`);
    return (data && typeof data === 'object' && Array.isArray(data.results)) ? data : { count: 0, total_pages: 1, current_page: 1, results: [] };
  } catch (error) {
    console.error("Error fetching return reminders:", error);
    return { count: 0, total_pages: 1, current_page: 1, results: [] };
  }
};
