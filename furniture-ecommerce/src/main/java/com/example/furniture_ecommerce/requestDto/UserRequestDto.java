package com.example.furniture_ecommerce.requestDto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
	
	private Integer id;
	
	@NotNull
	@Size(min = 2, max= 30,message= "Name must be min 2 max 30 characters")
	private String name;
	
	@NotNull
	@Size(min = 2, max= 30,message= "Surname must be min 2 max 30 characters")
	private String surname;
	
	@NotNull
	@Pattern(regexp = "[a-zA-Z] + @[a-z]+\\.[a-z]{2,4}")
	private String email;
	
	@NotNull
	@Size(min = 2, max= 30,message= "Username must be min 2 max 30 characters")
	private String username;
	
	@NotNull
	@Size(min = 2, max= 30,message= "Password must be min 2 max 30 characters")
	private String password;
}
