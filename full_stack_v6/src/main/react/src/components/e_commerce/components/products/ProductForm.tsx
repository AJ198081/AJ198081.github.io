import {type ChangeEvent, type FormEvent, useState} from "react";
import type {NewProduct} from "../../types/types.ts";
import {DEFAULT_PRODUCT_VALUE} from "../../types/defaultValues.ts";
import {useCategories} from "../../hooks/CustomHooks.ts";
import {useAddProductMutation} from "../../services/query-services/QueryWrappers.ts";
import toast from "react-hot-toast";

import {schemas} from "../../types/zod_types.ts";

import {createErrorMap, fromError} from 'zod-validation-error';
import {z as zod} from "zod";
import {capitaliseFirstLetter} from "../../utils/utilities.ts";

interface ProductFormProps {
    hideModal: () => void;
}

zod.config({
    customError: createErrorMap(),
})

const reValidateField = (name: string, value: string, validationErrors: Record<string, string>, setValidationErrors: (value: (((prevState: Record<string, string>) => Record<string, string>) | Record<string, string>)) => void) => {
    const fieldKey = name.split('.')[0] || name;

    if (validationErrors[fieldKey] || validationErrors[name]) {
        try {
            schemas[capitaliseFirstLetter(fieldKey) as keyof typeof schemas].parse(value);
            setValidationErrors(prev => {
                const updated = {...prev};
                delete updated[name];
                delete updated[fieldKey];
                return updated;
            });
        } catch (error) {
            const errorResponse = fromError(error);
            setValidationErrors(prev => ({...prev, [name]: errorResponse.message}));
        }
    }
}
export const ProductForm = ({hideModal}: ProductFormProps) => {

    const {categories} = useCategories();
    const [product, setProduct] = useState<NewProduct>(DEFAULT_PRODUCT_VALUE);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const addProductMutation = useAddProductMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            schemas.Product.parse(product);
        } catch (error) {
            const formattedErrors = fromError(error);

            const errorsObjects = formattedErrors.details
                .reduce((acc, detail) => {
                    const key = detail.path[0] as string;
                    acc[key] = detail.message;
                    return acc;
                }, {} as Record<string, string>);

            for (let error in errorsObjects) {
                toast(`${error}: ${errorsObjects[error]}`, {
                    duration: 5000,
                });
            }

            setValidationErrors(errorsObjects);

            return;
        }

        try {
            const data = await addProductMutation.mutateAsync(product);
            toast.success(
                `${data.name} added successfully!`,
                {
                    toasterId: "product-added-toast",
                    duration: 5000,
                    position: "bottom-right"
                }
            );
        } catch (e) {
            console.log(e);
        } finally {
            hideModal();
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        reValidateField(name, value, validationErrors, setValidationErrors);

        if (name === 'images') {
            const input = e.target as HTMLInputElement;
            const files: FileList | null = input.files;
            const images: File[] = files
                ? Array.from(files)
                : [];

            setProduct(prevState => ({
                ...prevState,
                [name]: images
            }));
        } else if (name === 'category') {
            setProduct(prevState => ({
                ...prevState,
                [name]: {name: value},
            }));
        } else {
            setProduct(prevState => ({
                ...prevState,
                [name]: Number.isNaN(+value) ? value : +value
            }));
        }
    }

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={{
                backgroundColor: "rgba(0,0,0,0.6)",
            }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <form
                        onSubmit={handleSubmit}
                        className="needs-validation"
                        noValidate
                    >
                        <div className="modal-header bg-success border-0 p-4 ">
                            <h5 className="modal-title">
                                <i className={`bi bi-pencil-square me-2 `}></i>
                                Add New Product
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={hideModal}
                            />
                        </div>
                        <div className="modal-body p-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-4">
                                        <label className="form-label">
                                            <i className="bi bi-tag me-2 text-success"></i>
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors['name'] ? 'is-invalid' : ''}`}
                                            placeholder="Name..."
                                            name="name"
                                            required
                                            value={product.name}
                                            onChange={handleInputChange}
                                        />
                                        {validationErrors['name'] && (
                                            <div className="invalid-feedback">{validationErrors['name']}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">
                                    <i className="bi bi-file-text me-2 text-success"></i>
                                    Description
                                </label>
                                <textarea
                                    className={`form-control ${validationErrors['description'] ? 'is-invalid' : ''}`}
                                    rows={4}
                                    placeholder="Enter product description..."
                                    name="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                ></textarea>
                                {validationErrors['description'] && (
                                    <div className="invalid-feedback">{validationErrors['description']}</div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="form-label">
                                            <i className="bi bi-currency-dollar me-2 text-success"></i>
                                            Price *
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className={`form-control ${validationErrors['price'] ? 'is-invalid' : ''}`}
                                                placeholder="price..."
                                                name="price"
                                                value={product.price}
                                                onChange={handleInputChange}
                                            />
                                            {validationErrors['price'] && (
                                                <div className="invalid-feedback">{validationErrors['price']}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="form-label">
                                            <i className="bi bi-currency-dollar me-2 text-success"></i>
                                            Discounted Price (Optional)
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${validationErrors['discountedPrice'] ? 'is-invalid' : ''}`}
                                            placeholder="Discounted price..."
                                            name="discountedPrice"
                                            value={product.discountedPrice}
                                            onChange={handleInputChange}
                                        />
                                        {validationErrors['discountedPrice'] && (
                                            <div className="invalid-feedback">{validationErrors['discountedPrice']}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-4">
                                        <label className="form-label">
                                            <i className="bi bi-boxes me-2 text-success"></i>
                                            Stock Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${validationErrors['stock'] ? 'is-invalid' : ''}`}
                                            placeholder="0"
                                            name="stock"
                                            min="0"
                                            value={product.stock}
                                            onChange={handleInputChange}
                                        />
                                        {validationErrors['stock'] && (
                                            <div className="invalid-feedback">{validationErrors['stock']}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={"row"}>

                                <div className="mb-3 col-md-4">
                                    <label className="form-label">
                                        <i className="bi bi-list-task me-2 text-success"></i>
                                        Category *
                                    </label>
                                    <select
                                        className={`form-select ${validationErrors['category'] || validationErrors['category.name'] ? 'is-invalid' : ''}`}
                                        name="category"
                                        value={product.category.name}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select a category...</option>
                                        {categories && categories.map(category => (
                                            <option
                                                key={category.name}
                                                value={category.name}
                                            >{category.name}</option>
                                        ))}
                                    </select>
                                    {(validationErrors['category'] || validationErrors['category.name']) && (
                                        <div className="invalid-feedback">{validationErrors['category'] || validationErrors['category.name']}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-md-8">
                                    <label className="form-label">
                                        <i className="bi bi-image me-2 text-success"></i>
                                        Images URLs
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        className="form-control"
                                        name="images"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={hideModal}
                            >
                                <i className="bi bi-x-circle me-2"></i>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success px-4"
                            >
                                {addProductMutation.isPending
                                    ? (<>
                                        <div
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        Adding Product...</>)
                                    : <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Add Product</>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}