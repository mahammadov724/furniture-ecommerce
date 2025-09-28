package com.example.furniture_ecommerce.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.furniture_ecommerce.entity.User;
import com.example.furniture_ecommerce.exception.OurRuntimeException;
import com.example.furniture_ecommerce.repository.UserRepository;
import com.example.furniture_ecommerce.requestDto.UserRequestDto;
import com.example.furniture_ecommerce.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void create(UserRequestDto dto) {
        Optional<User> byUsername = userRepository.findByUsername(dto.getUsername());
        if (byUsername.isPresent()) {
            throw new OurRuntimeException(null, "User already exists");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
    }

    public String login(UserRequestDto dto) {
        Optional<User> userOpt = userRepository.findByUsername(dto.getUsername());

        if (!userOpt.isPresent() || !passwordEncoder.matches(dto.getPassword(), userOpt.get().getPassword())) {
            throw new OurRuntimeException(null, "Username or password is incorrect");
        }

        return jwtUtil.generateToken(userOpt.get().getUsername(),
        		userOpt.get().getName(),
        		userOpt.get().getSurname(),
        		userOpt.get().getEmail());
    }
}
