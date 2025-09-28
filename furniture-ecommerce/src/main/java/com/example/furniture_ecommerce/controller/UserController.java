package com.example.furniture_ecommerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.furniture_ecommerce.exception.OurRuntimeException;
import com.example.furniture_ecommerce.requestDto.UserRequestDto;
import com.example.furniture_ecommerce.service.UserService;
import com.example.furniture_ecommerce.util.JwtUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping(path = "/register")
	public void createUser(@Valid @RequestBody UserRequestDto dto,BindingResult br) {
		if (br.hasErrors()) {
			throw new OurRuntimeException(br,"");
		}
		userService.create(dto);
	}
	
	@PostMapping(path = "/login")
	public String userLogin(@RequestBody UserRequestDto d) {
		return userService.login(d);
	}
	
	@GetMapping(path = "/profile")
	public ResponseEntity<Map<String, String>> getUserProfile(@RequestHeader("Authorization") String token){
		if (token.startsWith("Bearer")) {
			token = token.substring(7);
		}
		
		Map<String,String> claims = jwtUtil.extractClaims(token);
		return ResponseEntity.ok(claims);
	}
}
