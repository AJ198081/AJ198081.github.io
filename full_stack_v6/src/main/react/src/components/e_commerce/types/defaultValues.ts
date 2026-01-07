import type {NewProduct} from "../components/products/ProductForm.tsx";

export const DEFAULT_PRODUCT_VALUE: NewProduct = {
    product: {
    name: '',
    description: '',
    price: 0.00,
    discountedPrice: undefined,
    stock: 0,
        category: {name: ''},
    },
    images: [],
}