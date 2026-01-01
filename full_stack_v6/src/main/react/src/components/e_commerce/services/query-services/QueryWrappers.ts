import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {getAllProducts} from "../BackendService.ts";
import {allProductsQueryOptions, useAddNewProductQueryOptions} from "./QueryOptions.ts";

export const useAllProductsQuery = () => {
    const {data: products, isPending, isLoading, isError, error} = useQuery({
        queryKey: ['allProducts'],
        queryFn: getAllProducts
    });

    return {products, isPending, isLoading, isError, error};
};



export const useBetterAllProductsQuery = () => {
    return useQuery(allProductsQueryOptions());
}

export const useAddProductMutation = () => {

    return useMutation(useAddNewProductQueryOptions(new QueryClient()));
}
