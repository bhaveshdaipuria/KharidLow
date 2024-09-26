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

	const  response = await productInstance.get(url);

	return response.data;
};

const getAllProducts = async () => {
	const url = `/allproduct`;

	const res = await productInstance.get(url);

	return res.data;
};
const addProduct = async (data) => {
	const url = `/addnewproduct`;
	const response = await productInstance
		.post(url, data, {
			"Content-Type": "application/json",
		});
	return response.data;
};

const updateProducts = async (data) => {
	const url = `/updateprodut`;

	const response = await productInstance.patch(url, data, {
		"Content-Type": "application/json",
	})

	return response;
}

const updateStock = async (id, data) => {
	const url = `/updatestock/${id}`;

	const response = await productInstance.put(url, data, {
		"Content-Type": "application/json",
	})

	return response;
}

const addNewImage = async(id, data) => {
	const url = `/addnewimage/${id}`;

	const response = await productInstance.put(url, data, {
		"Content-Type": "application/json",
	})

	return response;
}

export { deleteProduct, getCategoryData, getAllProducts, addProduct, updateProducts, updateStock, addNewImage };
