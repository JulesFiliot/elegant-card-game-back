package com.example.demo.msgemitter.comm.controller;


import org.springframework.stereotype.Service;

import com.example.demo.model.Loggs;
import com.example.demo.model.LoggsRepository;

@Service
public class loggsService {
	private final LoggsRepository loggsRepository;

	public loggsService(LoggsRepository loggsRepository) {
		super();
		this.loggsRepository = loggsRepository;

		
	}
	
	public void addLoggs(Loggs log) {
		loggsRepository.save(log);
	}



}
