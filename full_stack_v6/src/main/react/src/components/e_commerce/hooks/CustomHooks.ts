import type {ApiResponse} from "../types/types.ts";
import {useEffect, useState} from "react";
import type {AxiosError} from "axios";
import {backendClient} from "../../../api-client/BackendClient.tsx";
import type {components} from "../types/schema";
import {useQuery} from "@tanstack/react-query";
import {useAllCategoriesQueryOptions} from "../services/query-services/QueryOptions.ts";

export function useFetchApi<T>(url: string): ApiResponse<T> {

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);
            setErrorMessage(null);

            try {
                const response = await backendClient.get<T>(url);
                setData(response.data);
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                setIsError(true);
                setErrorMessage(error.response?.data?.message || error.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        }
        void fetchData();
    }, [url]);

    return {data, isLoading, isError, errorMessage};
}

export const useAllProducts = () => {
    return useFetchApi<components["schemas"]["Product"][]>(import.meta.env.VITE_PRODUCT_API_PATH + '/all');
}

export const useCategories = () => {
    const {data, isLoading, isError, error} = useQuery(useAllCategoriesQueryOptions());

    if (!isLoading && !isError) {
        data && data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
        categories: data,
        isLoading,
        isError,
        error
    };
};