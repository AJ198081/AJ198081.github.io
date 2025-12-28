import {useAllProducts} from "../../hooks/CustomHooks.ts";

export const Cart = () => {

    const fetchedProducts = useAllProducts();

    if (fetchedProducts.isLoading) {
        return <div>Loading...</div>;
    }
    if (fetchedProducts.isError) {
        return <div className={"d-flex justify-center align-items-center vh-100"}>{fetchedProducts.errorMessage}...</div>
    }

    return (
        <div>Fetched {fetchedProducts.data?.length} products..</div>
    );
}