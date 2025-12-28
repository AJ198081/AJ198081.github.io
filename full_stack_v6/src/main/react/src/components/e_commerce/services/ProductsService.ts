import backendClient from "../../../api-client/BackendClient.tsx";
import type {components} from "../types/schema";


export const allProductsPromise = () => {
    return backendClient.get<components["schemas"]["Product"]>(
        `${import.meta.env.PRODUCT_API_PATH}/all`
    );
};



