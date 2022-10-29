import axios from "axios";

const api = axios.create({
    baseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/mrfelipelima.wordpress.com'
})

export default api;