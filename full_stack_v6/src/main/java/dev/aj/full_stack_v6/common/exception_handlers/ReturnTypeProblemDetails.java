package dev.aj.full_stack_v6.common.exception_handlers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ProblemDetail;

@Operation(
        responses = {
                @ApiResponse(
                        content = @Content(schema = @Schema(implementation = ProblemDetail.class))
                )
        }
)
public @interface ReturnTypeProblemDetails {
}
