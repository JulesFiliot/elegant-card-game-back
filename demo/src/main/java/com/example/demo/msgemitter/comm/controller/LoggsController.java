package com.example.demo.msgemitter.comm.controller;

import org.springframework.jms.annotation.JmsListener;

import org.springframework.stereotype.Controller;

import com.example.demo.model.Loggs;

import DTOuser.UserDTO;

@Controller
public class LoggsController {
	private loggsService loggsService;
	public LoggsController(loggsService loggsService){
		this.loggsService=loggsService;
	}
	@JmsListener(destination = "logger/chat", containerFactory = "connectionFactory")
    public void chatLogger(String msgStr) {
		Loggs log= new Loggs();
		log.setContent(msgStr);
		log.setType("[CHAT]");
		loggsService.addLoggs(log);		
        System.out.println("[CHAT] RECEIVED String MSG=["+msgStr+"]");

    }
	@JmsListener(destination = "user_update", containerFactory = "connectionFactory")
    public void userLogger(UserDTO msgStr) {
		Loggs log= new Loggs();
		log.setContent(msgStr.toString());
		log.setType("[updating user]");
		loggsService.addLoggs(log);		
        System.out.println("[UPDATE USER] RECEIVED String MSG=["+msgStr+"]");

    }
	@JmsListener(destination = "notifications", containerFactory = "connectionFactory")
    public void notificationLogger(String msgStr) {
		Loggs log= new Loggs();
		log.setContent(msgStr);
		log.setType("[updating user]");
		loggsService.addLoggs(log);		
        System.out.println("[NOTIFICATION] RECEIVED String MSG=["+msgStr+"]");

    }

}
