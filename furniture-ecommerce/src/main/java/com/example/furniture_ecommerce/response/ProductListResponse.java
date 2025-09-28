package com.example.furniture_ecommerce.response;

import java.util.List;

import com.example.furniture_ecommerce.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponse {

	private List<Product> products;
}