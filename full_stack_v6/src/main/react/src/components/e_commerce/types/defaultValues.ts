import type {NewProduct} from "./types.ts";

export const DEFAULT_PRODUCT_VALUE: NewProduct = {
    name: '',
    description: '',
    price: 0.00,
    discountedPrice: undefined,
    stock: 0,
    category: {name: ''},
    images: [],
}