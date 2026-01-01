package dev.aj.full_stack_v6.product;

import dev.aj.full_stack_v6.common.domain.entities.Product;
import org.springframework.data.domain.Page;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product, MultipartFile[] images);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Page<Product> findProductPage(String name, int page, int size, String sortDirection);
    void putProduct(Long id, Product product);
    void patchProduct(Long id, Product product);
    void deleteProductById(Long id);
}
