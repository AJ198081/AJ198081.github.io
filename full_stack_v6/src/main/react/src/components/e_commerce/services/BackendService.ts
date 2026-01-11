import {backendClient} from "../../../api-client/BackendClient.tsx";
import type { NewProduct } from "../components/products/ProductForm.tsx";
import type {components} from "../types/schema";
import type {Schema} from "../types/types.ts";


const PRODUCT_BASE_URL = import.meta.env.VITE_PRODUCT_API_PATH as string;
const CATEGORIES_BASE_URL = import.meta.env.VITE_CATEGORY_API_PATH as string;


export const getAllProducts = () => {
    return backendClient.get<components["schemas"]["Product"][]>(
        `${PRODUCT_BASE_URL}/all`
    );
};

export const getAllCategories = async () => {
    const axiosResponse = await backendClient.get<components["schemas"]["Category"][]>(
        `${CATEGORIES_BASE_URL}/all`
    );

    return axiosResponse.data;
};

export const addNewProductPromise = async (productBody: NewProduct) => {

    const formData = new FormData();

    const {images, product} = productBody;

    formData.append('product', new Blob([JSON.stringify(product)], {type: 'application/json'}));

    if (images) {
        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            file && formData.append('images', file, (file as File).name || `image-${i}.png`);
        }
    }


    const addProductResponse = await backendClient
        .post(
            `${PRODUCT_BASE_URL}/`,
            formData
        );
    return addProductResponse.data as Schema["Product"];
};



