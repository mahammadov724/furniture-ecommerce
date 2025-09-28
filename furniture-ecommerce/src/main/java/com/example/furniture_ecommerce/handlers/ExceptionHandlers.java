package com.example.furniture_ecommerce.handlers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.furniture_ecommerce.exception.OurRuntimeException;
import com.example.furniture_ecommerce.response.ExceptionResponse;
import com.example.furniture_ecommerce.response.ValidationResponse;

@RestControllerAdvice
public class ExceptionHandlers {

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST) //400
	public ExceptionResponse handle(OurRuntimeException exc) {
		ExceptionResponse response = new ExceptionResponse();
		
		BindingResult br = exc.getBr();
		if (br == null) {
			
		}else {
			List<FieldError> fieldErrors = br.getFieldErrors(null);
			List<ValidationResponse> validations = new ArrayList<ValidationResponse>();
			for (FieldError fieldError : fieldErrors) {
				ValidationResponse validation = new ValidationResponse();
				validation.setField(fieldError.getField());
				validation.setDefaultMessage(fieldError.getDefaultMessage());
				validations.add(validation);
			}
			response.setValidations(validations);
		}
		response.setMessage(exc.getMessage());
		return response;
	}
}
