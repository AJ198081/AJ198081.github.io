import {queryOptions} from "@tanstack/react-query";
import {allCategoriesPromise, allProductsPromise} from "../BackendService.ts";

export const DEFAULT_ALL_PRODUCT_QUERY_KEY = 'allProducts';
export const DEFAULT_ALL_CATEGORIES_KEY = 'allCategories';

export const allProductsQueryOptions = (queryKey: [string] = [DEFAULT_ALL_PRODUCT_QUERY_KEY]) => (
    queryOptions({
        queryKey: queryKey,
        queryFn: allProductsPromise,
        staleTime: 60 * 100,
        gcTime: 600 * 100,
        refetchOnWindowFocus: false
    })
);
export const useAllCategoriesQueryOptions = (queryKey: [string] = [DEFAULT_ALL_CATEGORIES_KEY]) => (
    queryOptions({
        queryKey: queryKey,
        queryFn: allCategoriesPromise,
        staleTime: 60 * 100,
        gcTime: 600 * 100,
        refetchOnWindowFocus: false
    })
);