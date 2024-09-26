import { BACKEND } from "../../lib/config";
import axios from "axios";

const API_URL = BACKEND.API_URL;

const userLogin = async (data) => {
	const url = `${API_URL}/user/login`;

	const response = await axios
		.post(url, data, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});

	return response.data;

};

export { userLogin };
