import {useQuery} from "@tanstack/react-query";
import {allProductsPromise} from "../BackendService.ts";
import {allProductsQueryOptions} from "./QueryOptions.ts";

export const useAllProductsQuery = () => {
    const {data: products, isPending, isLoading, isError, error} = useQuery({
        queryKey: ['allProducts'],
        queryFn: allProductsPromise
    });

    return {products, isPending, isLoading, isError, error};
};



export const useBetterAllProductsQuery = () => {
    return useQuery(allProductsQueryOptions());
}

