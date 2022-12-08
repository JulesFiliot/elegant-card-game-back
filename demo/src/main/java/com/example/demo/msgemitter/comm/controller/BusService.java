package com.example.demo.msgemitter.comm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import DTOuser.UserDTO;

@Service
public class BusService {
	@Autowired
    JmsTemplate jmsTemplate;

    public void sendMsg(String msg) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+msg+"]");
        jmsTemplate.convertAndSend("RESULT_BUS_MNG",msg);
    }

    public void sendMsg(String msg, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+msg+"] to Bus=["+msg+"]");
        jmsTemplate.convertAndSend(busName,msg);
    }
    public void updateUserAsync(UserDTO user) throws JsonProcessingException {

		 System.out.println("[BUSSERVICE] SEND String MSG=["+user.toString()+"] to Bus=[user]");

	        jmsTemplate.convertAndSend("user_update",user);
	        
	
		 
	}

}
