import { BACKEND } from "../../lib/config";
import axios from "axios";

const API_URL = BACKEND.API_URL;

const addUser = async (data) => {
	const url = `${API_URL}/user/register`;

	axios
		.post(url, data, {
			"Content-Type": "application/json",
			withCredentials: true,
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
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
