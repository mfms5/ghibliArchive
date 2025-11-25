import axios from "axios";

const baseURL = "https://ghibliapi.vercel.app";

const getAllMovies = async () => {
  const response = await axios.get(`${baseURL}/films`);
  return response.data;
};

const getMovieById = async (id) => {
  const response = await axios.get(`${baseURL}/films/${id}`);
  return response.data;
};

export default { getAllMovies, getMovieById };
