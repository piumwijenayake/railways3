import axios from "axios";

const API_URL = "http://localhost:3000/services/api";

export const getTrainLocation = async (trainId) => {
  const response = await axios.get(`${API_URL}/trains/${trainId}/location`);
  return response.data;
};

export const postTrainLocation = async (data) => {
  const response = await axios.post(`${API_URL}/trains/location`, data);
  return response.data;
};
