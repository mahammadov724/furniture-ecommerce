package com.example.furniture_ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.furniture_ecommerce.exception.OurRuntimeException;
import com.example.furniture_ecommerce.requestDto.UserRequestDto;
import com.example.furniture_ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping(path = "/register")
	public void createUser(@Valid @RequestBody UserRequestDto dto,BindingResult br) {
		if (br.hasErrors()) {
			throw new OurRuntimeException(br,"");
		}
		userService.create(dto);
	}
}
