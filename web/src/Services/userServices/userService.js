import { BACKEND } from "../../lib/config";
import axios from "axios";

const API_URL = BACKEND.API_URL;

const addUser = async (data) => {
	const url = `${API_URL}/user/register`;

	const response = await axios.post(url, data, {
		"Content-Type": "application/json",
		withCredentials: true,
	})
		
	return response.data;
};

const addAddress = async (data) => {
	const url = `${API_URL}/user/addaddress`;

	const response = await axios.post(url, data, {
		headers: {
			"Content-Type": "application/json",
		}
	});

	return response;
}

export { addUser, addAddress };
