package dev.aj.full_stack_v6.product.repositories;

import dev.aj.full_stack_v6.common.domain.entities.Product;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByName(String name);
    boolean existsById(@NonNull Long id);

    Page<Product> findPageByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);

    @Query("select p from Product p where p.price between :minPrice and :maxPrice")
    List<Product> getProductsPageBetweenPrice(@Param("minPrice") BigDecimal min, @Param("maxPrice") BigDecimal max, PageRequest pageRequest);
}
