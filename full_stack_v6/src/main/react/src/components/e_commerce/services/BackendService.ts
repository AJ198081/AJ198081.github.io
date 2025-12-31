import backendClient from "../../../api-client/BackendClient.tsx";
import type {components} from "../types/schema";


const PRODUCT_BASE_URL = import.meta.env.VITE_PRODUCT_API_PATH as string;
const CATEGORIES_BASE_URL = import.meta.env.VITE_CATEGORY_API_PATH as string;

export const allProductsPromise = () => {
    return backendClient.get<components["schemas"]["Product"][]>(
        `${PRODUCT_BASE_URL}/all`
    );
};

export const allCategoriesPromise = async () => {
    const axiosResponse = await backendClient.get<components["schemas"]["Category"][]>(
        `${CATEGORIES_BASE_URL}/all`
    );

    return axiosResponse.data;
};



