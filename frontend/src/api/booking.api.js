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