import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.patch(`${API_BASE_URL}/tasks/${id}`, taskData);
  return response.data;
};

export const getLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/logs`);
  return response.data;
};
export const getTags = async () => {
  const response = await axios.get(`${API_BASE_URL}/tags`);
  return response.data;
};
export const createTag = async (TagData) => {
  const response = await axios.post(`${API_BASE_URL}/tags`, TagData);
  return response.data;
};
