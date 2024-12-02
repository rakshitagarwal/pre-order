import axios from "axios";

const ENDPOINT = 'http://localhost:4000'

export const getAllDishes = async () => await axios.get(ENDPOINT +"/alldishes");

