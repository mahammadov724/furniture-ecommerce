package com.example.furniture_ecommerce.response;

import java.util.List;

import lombok.Data;

@Data
public class ExceptionResponse {
	private String message;
	private List<ValidationResponse> validations;
	
}
