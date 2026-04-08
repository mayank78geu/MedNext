package com.mednext.exception;

import com.mednext.dto.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ApiResponse<?> handleAppException(AppException ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ApiResponse<?> handleGenericException(Exception ex) {
        return ApiResponse.error("Something went wrong");
    }
}