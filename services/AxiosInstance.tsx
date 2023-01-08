import axios from "axios";

// todo -> Add more options as required
const AxiosInstance = axios.create({
  baseURL: "https://shishya-backend-production.up.railway.app",
});

export default AxiosInstance;
