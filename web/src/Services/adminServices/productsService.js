import { BACKEND } from "../../lib/config";
import axios from "axios";

const API_URL = BACKEND.API_URL;

const productInstance = axios.create({
	baseURL: `${API_URL}/products`,
});

productInstance.interceptors.request.use(
	(config) => {
		const token = document.cookie.split("=")[1];
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		console.log(err);
	},
);

const deleteProduct = async (id) => {
	const url = `/addnewproduct/${id}`;

	productInstance
		.delete(url)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getCategoryData = async () => {
	const url = `/getcategorydata`;

	productInstance
		.get(url)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getAllProducts = async () => {
	const url = `/allproduct`;

	productInstance
		.get(url)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};
const addProduct = async (data) => {
	const url = `/addnewproduct`;
	productInstance
		.post(url, data, {
			"Content-Type": "application/json",
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export { deleteProduct, getCategoryData, getAllProducts, addProduct };
