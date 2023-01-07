import axios from "axios";

// todo -> Add more options as required
const AxiosInstance = axios.create({
  baseURL: "https://api.example.com/v1",
});

export default AxiosInstance;
