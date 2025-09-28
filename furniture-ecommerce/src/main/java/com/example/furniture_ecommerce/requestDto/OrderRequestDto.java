package com.example.furniture_ecommerce.requestDto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderRequestDto {
	
	@NotNull
	private Integer cartId;
	
	@Size(min = 2, max = 20, message = "FirstName must be min 2 max 20 characters")
	private String firstName;
	
	@Size(min = 2, max = 20, message = "LastName must be min 2 max 20 characters")
	private String lastName;
	
	@NotBlank(message = "Country not blank")
	private String country;
	
	@NotBlank(message = "Address not blank")
	private String address; 
	
	@NotBlank(message = "City not blank")
	private String city;
	
	@NotBlank(message = "Phone not blank")
	private String phone;
	
	@Pattern(regexp = "[a-zA-Z]+@[a-z]+\\.[a-z]{2,4}")
	private String email;
	
	@NotBlank(message = "Can not be empty cart number")
	private String cartNumber;
	
	@NotBlank(message = "Can not be empty zip code")
	private String zipCode;
	
	@NotBlank(message = "Can not empty expiry month")
	private String expiryMonth;
	
	@NotNull(message = "Expiryyear cannot be null.")
	@Min(value = 23, message = "Expiry year must be greater than or equals to the current year")
	private Integer expiryYear;
	
}