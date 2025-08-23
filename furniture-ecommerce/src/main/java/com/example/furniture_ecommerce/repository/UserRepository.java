package com.example.furniture_ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.furniture_ecommerce.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{

	Optional<User> findByUsername(String username);

	

}
