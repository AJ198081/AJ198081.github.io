import type {NewProduct} from "../../types/types.ts";
import {useCategories} from "../../hooks/CustomHooks.ts";
import {useAddProductMutation} from "../../services/query-services/QueryWrappers.ts";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {saveProductBody} from "../../zod/ordersAPIs.zod.ts";

interface ProductFormProps {
    hideModal: () => void;
}

export const ProductForm = ({hideModal}: ProductFormProps) => {

    const {categories} = useCategories();
    const addProductMutation = useAddProductMutation();

    // @ts-ignore
    const {register, handleSubmit: formSubmissionHandler, formState: {errors}} = useForm<NewProduct>({
        resolver: zodResolver(saveProductBody)
    });

    const handleSubmit = async (data: NewProduct) => {
        try {
            const submittedData = await addProductMutation.mutateAsync(data);
            toast.success(
                `${submittedData.name} added successfully!`,
                {
                    toasterId: "product-added-toast",
                    duration: 5000,
                    position: "bottom-right"
                }
            );
            hideModal();
        } catch (e) {
            console.log(typeof e);
            if (e instanceof Error) {
                toast.error(
                    `${e.message}`
                );
            }
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
                        onSubmit={formSubmissionHandler(handleSubmit)}
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
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Enter product name..."
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name.message}</div>
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
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    rows={4}
                                    placeholder="Enter product description..."
                                    {...register("description", {
                                        required: true,
                                    })}
                                ></textarea>
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description.message}</div>
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
                                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                placeholder="price..."
                                                {...register("price", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                })}
                                            />
                                            {errors.price && (
                                                <div className="invalid-feedback">{errors.price.message}</div>
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
                                            className={`form-control ${errors.discountedPrice ? 'is-invalid' : ''}`}
                                            placeholder="Discounted price..."
                                            {...register("discountedPrice", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                        {errors.discountedPrice && (
                                            <div className="invalid-feedback">{errors.discountedPrice.message}</div>
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
                                            className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                            placeholder="0"
                                            min="0"
                                            {...register("stock", {
                                                required: true,
                                                valueAsNumber: true,
                                            })}
                                        />
                                        {errors.stock && (
                                            <div className="invalid-feedback">{errors.stock.message}</div>
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
                                        className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                        {...register("category.name", {
                                            required: true,
                                        })}
                                    >
                                        <option value="">Select a category...</option>
                                        {categories && categories.map(category => (
                                            <option
                                                key={category.name}
                                                value={category.name}
                                            >{category.name}</option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <div className="invalid-feedback">{errors.category.message}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-md-8">
                                    <label className="form-label">
                                        <i className="bi bi-image me-2 text-success"></i>
                                        Images
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        className="form-control"
                                        {...register("images")}
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