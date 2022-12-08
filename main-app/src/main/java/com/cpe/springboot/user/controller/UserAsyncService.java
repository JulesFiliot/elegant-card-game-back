package com.cpe.springboot.user.controller;

import javax.jms.JMSException;
import javax.jms.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;



import com.fasterxml.jackson.core.JsonProcessingException;

import DTOuser.UserDTO;


@Service
public class UserAsyncService {
	@Autowired
    JmsTemplate jmsTemplate;
	UserService userService;
	
	public UserAsyncService(UserService userService) {
		this.userService=userService;
	}
	


	
	public void updateUserAsync(UserDTO user) throws JsonProcessingException {

		 System.out.println("[BUSSERVICE] SEND String MSG=["+user.toString()+"] to Bus=[user]");
	      jmsTemplate.convertAndSend("user_update",user);
	        
	
		 
	}
	@JmsListener(destination = "user_update",containerFactory="connectionFactory")
	public void receiveUpdate(final UserDTO MessageReceived,final Message jsonMessage) throws JMSException{
		System.out.println("receiving");
		userService.updateUser(MessageReceived);

	}



	
}
