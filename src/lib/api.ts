import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL

const localApi = axios.create({
  baseURL: apiURL || '/api/v1'
})

export { localApi };
