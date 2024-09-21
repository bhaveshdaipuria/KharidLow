import { BACKEND } from "../../lib/config";
import axios from "axios";

const API_URL = BACKEND.API_URL;

const userLogin = async (data) => {
	const url = `${API_URL}/login`;

	axios
		.post(url, data, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export { userLogin };
