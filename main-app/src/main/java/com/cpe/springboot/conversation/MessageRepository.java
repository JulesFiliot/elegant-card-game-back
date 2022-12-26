package com.cpe.springboot.conversation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
	  // additional methods as needed
	}