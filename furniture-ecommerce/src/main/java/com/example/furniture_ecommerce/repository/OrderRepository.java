package com.example.furniture_ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.furniture_ecommerce.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}