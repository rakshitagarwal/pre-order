import axios from "axios";
import { API_ENDPOINT } from "../constants/endpoint";

export const getAllDishes = async () =>
  (await axios.get(API_ENDPOINT + "/alldishes")).data;

export const addPreOrder = async (sendData) =>
  await axios.post(API_ENDPOINT + "/addmeal", sendData);
