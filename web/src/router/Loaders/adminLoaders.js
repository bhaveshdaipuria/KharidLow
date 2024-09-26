import { getAllProducts } from "../../Services/adminServices/productsService";

const getProducts = async () => {
    try {
        const products = await getAllProducts();
        return {products};
    } catch (err) {
        console.log(err)
    }
}

export { getProducts }