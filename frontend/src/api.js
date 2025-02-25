import axios from 'axios';

const API_URL = "https://babysteps-appointment-o7ij.onrender.com";  // On local use change URL :-  http://localhost:5000/


export const fetchDoctors = async () => axios.get(`${API_URL}/doctors`);
export const fetchAvailableSlots = async (doctorId, date) => 
  axios.get(`${API_URL}/doctors/${doctorId}/slots?date=${date}`);
export const fetchAppointments = async () => axios.get(`${API_URL}/appointments`);
export const createAppointment = async (data) => axios.post(`${API_URL}/appointments`, data);
export const updateAppointment = async (id, data) => axios.put(`${API_URL}/appointments/${id}`, data);
export const deleteAppointment = async (id) => axios.delete(`${API_URL}/appointments/${id}`);
export const fetchDoctorName = async (doctorId) => {
  return axios.get(`${API_URL}/doctor/${doctorId}`);
};
