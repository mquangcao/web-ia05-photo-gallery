import { app } from "@/config";
import axios from "axios";

export const client = axios.create({
  baseURL: app.photoStore,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
