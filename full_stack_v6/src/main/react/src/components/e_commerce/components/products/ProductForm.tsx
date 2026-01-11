import {useCategories} from "../../hooks/CustomHooks.ts";
import {useAddProductMutation} from "../../services/query-services/QueryWrappers.ts";
import toast from "react-hot-toast";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {SaveProductBody} from "../../orval/zod/ordersAPIs.zod.ts";

interface ProductFormProps {
    hideModal: () => void;
}

export type NewProduct = z.infer<typeof SaveProductBody>;

export const ProductForm = ({hideModal}: ProductFormProps) => {

    const {categories} = useCategories();
    const addProductMutation = useAddProductMutation();

    const {
        register,
        control,
        handleSubmit: formSubmissionHandler,
        formState: {errors}
    } = useForm<NewProduct>({
        resolver: zodResolver(SaveProductBody)
    });

    const handleSubmit = async (data: NewProduct) => {
        try {
            const submittedData = await addProductMutation.mutateAsync(data);

            // const submittedData = await saveProductMutation.mutateAsync({data});

            toast.success(
                `${submittedData.name || data.product.name} added successfully!`, {
                    id: "product-added-toast",
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
                                            className={`form-control ${errors.product?.name ? 'is-invalid' : ''}`}
                                            placeholder="Enter product name..."
                                            {...register("product.name", {
                                                required: true,
                                            })}
                                        />
                                        {errors.product?.name && (
                                            <div className="invalid-feedback">{errors.product.name.message}</div>
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
                                    className={`form-control ${errors.product?.description ? 'is-invalid' : ''}`}
                                    rows={4}
                                    placeholder="Enter product description..."
                                    {...register("product.description", {
                                        required: true,
                                    })}
                                ></textarea>
                                {errors.product?.description && (
                                    <div className="invalid-feedback">{errors.product.description.message}</div>
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
                                                className={`form-control ${errors.product?.price ? 'is-invalid' : ''}`}
                                                placeholder="price..."
                                                {...register("product.price", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                })}
                                            />
                                            {errors.product?.price && (
                                                <div className="invalid-feedback">{errors.product.price.message}</div>
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
                                            className={`form-control ${errors.product?.discountedPrice ? 'is-invalid' : ''}`}
                                            placeholder="Discounted price..."
                                            {...register("product.discountedPrice", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                        {errors.product?.discountedPrice && (
                                            <div className="invalid-feedback">{errors.product.discountedPrice.message}</div>
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
                                            className={`form-control ${errors.product?.stock ? 'is-invalid' : ''}`}
                                            placeholder="0"
                                            min="0"
                                            {...register("product.stock", {
                                                required: true,
                                                valueAsNumber: true,
                                            })}
                                        />
                                        {errors.product?.stock && (
                                            <div className="invalid-feedback">{errors.product.stock.message}</div>
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
                                        className={`form-select ${errors.product?.category?.name ? 'is-invalid' : ''}`}
                                        {...register("product.category.name", {
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
                                    {errors.product?.category?.name && (
                                        <div className="invalid-feedback">{errors.product.category.name.message}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-md-8">
                                    <label className="form-label">
                                        <i className="bi bi-image me-2 text-success"></i>
                                        Images
                                    </label>
                                    <Controller
                                        name="images"
                                        control={control}
                                        render={({field}) => (
                                            <input
                                                type="file"
                                                name={"images"}
                                                multiple={true}
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    field.onChange(files ? Array.from(files) : []);
                                                }}
                                                className={`form-control ${errors.images ? 'is-invalid' : ''}`}
                                            />
                                        )}
                                    />
                                    {errors.images && (
                                        <div className="invalid-feedback">{errors.images.message}</div>
                                    )}
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