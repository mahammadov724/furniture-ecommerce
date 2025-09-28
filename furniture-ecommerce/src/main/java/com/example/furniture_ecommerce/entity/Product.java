package com.example.furniture_ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {


		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id;
		private String name;
		private Double price;
		
		@Column(columnDefinition = "TEXT")
		private String image;
		
		private Integer userId;
}
