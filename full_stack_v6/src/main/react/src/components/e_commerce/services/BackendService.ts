import backendClient from "../../../api-client/BackendClient.tsx";
import type {components} from "../types/schema";
import type {NewProduct, Schema} from "../types/types.ts";


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

export const addNewProductPromise = async (product: NewProduct) => {

    const formData = new FormData();

    const {images, ...productData} = product;

    formData.append('product', JSON.stringify(productData));

    images.forEach((image) => {
        formData.append('images', image);
    });

    const addProductResponse = await backendClient
        .post(
            `${PRODUCT_BASE_URL}/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    return addProductResponse.data as Schema["Product"];
};



