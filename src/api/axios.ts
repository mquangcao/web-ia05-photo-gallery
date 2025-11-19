import axios from "axios";

// Lorem Picsum API base URL
const PICSUM_API_URL = "https://picsum.photos";

export const client = axios.create({
  baseURL: PICSUM_API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
