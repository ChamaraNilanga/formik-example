import axios from "axios";

const BaseURL = "http://localhost:3500";

const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BaseURL}/user`, data);
    return response;
  } catch (error) {
    return error;
  }
}

export { registerUser };