import {mutationOptions, type QueryClient, queryOptions} from "@tanstack/react-query";
import {addNewProductPromise, getAllCategories, getAllProducts} from "../BackendService.ts";

export const DEFAULT_ALL_PRODUCT_QUERY_KEY = 'allProducts';
export const DEFAULT_ALL_CATEGORIES_KEY = 'allCategories';

export const allProductsQueryOptions = (queryKey: [string] = [DEFAULT_ALL_PRODUCT_QUERY_KEY]) => (
    queryOptions({
        queryKey: queryKey,
        queryFn: getAllProducts,
        staleTime: 60 * 100,
        gcTime: 600 * 100,
        refetchOnWindowFocus: false
    })
);
export const useAllCategoriesQueryOptions = (queryKey: [string] = [DEFAULT_ALL_CATEGORIES_KEY]) => (
    queryOptions({
        queryKey: queryKey,
        queryFn: getAllCategories,
        staleTime: 60 * 1000,
        gcTime: 600 * 1000,
        refetchOnWindowFocus: false
    })
);

export const useAddNewProductQueryOptions = (queryClient: QueryClient) => (
    mutationOptions({
            mutationFn: addNewProductPromise,
            onError: (error) => console.log(error),
            onSuccess: () => {
                console.log(`Product added successfully`);
                void queryClient.invalidateQueries({
                    queryKey: [DEFAULT_ALL_PRODUCT_QUERY_KEY]
                });
            }
    })
)