package com.example.furniture_ecommerce.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.furniture_ecommerce.entity.User;
import com.example.furniture_ecommerce.exception.OurRuntimeException;
import com.example.furniture_ecommerce.repository.UserRepository;
import com.example.furniture_ecommerce.requestDto.UserRequestDto;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public void create(UserRequestDto dto) {
		Optional<User> byUsername = userRepository.findByUsername(dto.getUsername());
		if(byUsername.isPresent()) {
			throw new OurRuntimeException("User already Exist");
		}
		User user = new User();
		user.setId(null);
		user.setName(dto.getName());
		user.setSurname(dto.getSurname());
		user.setUsername(dto.getUsername());
		user.setEmail(dto.getEmail());
		String encode = passwordEncoder.encode(dto.getPassword());
		user.setPassword(encode);
		userRepository.save(user);
	}

}
