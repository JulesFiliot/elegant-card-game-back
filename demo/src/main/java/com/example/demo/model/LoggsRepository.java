package com.example.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggsRepository extends JpaRepository<Loggs, Long> {
	  // additional methods as needed
	}