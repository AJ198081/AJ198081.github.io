package dev.aj.full_stack_v5.practice;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.client.RestClient;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(locations = {
        "classpath:/junit-platform.properties",
        "classpath:application-test.properties"
})
@Execution(ExecutionMode.CONCURRENT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CodeValidationTest {

    @Autowired
    private CodeValidationService codeValidationService;

    RestClient restClient;

    @BeforeAll
    void beforeAll() {
        restClient = RestClient.builder()
                .baseUrl("https://www.skipapp.com.au/api/promotions")
                .build();
    }

    @Test
    @Order(1)
    void verifyUpdatePromotions() {
        codeValidationService.validateAndUpdatePromotions(restClient);
    }

    @RepeatedTest(value = 1000, name = "{currentRepetition}/{totalRepetitions}")
    @Order(2)
    void validateAndAddCodeToDatabase() throws InterruptedException {
        Thread.sleep(100);
        boolean isValid = codeValidationService.testCode(restClient);
        Assertions.assertThat(isValid).isTrue();
    }

}