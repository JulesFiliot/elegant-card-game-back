package com.example.demo.msgemitter.comm.controller;

import org.springframework.jms.annotation.JmsListener;

import org.springframework.stereotype.Controller;

import com.example.demo.model.Loggs;

@Controller
public class LoggsController {
	private loggsService loggsService;
	public LoggsController(loggsService loggsService){
		this.loggsService=loggsService;
	}
	@JmsListener(destination = "logger/chat", containerFactory = "connectionFactory")
    public void receiveMessageB(String msgStr) {
		Loggs log= new Loggs();
		log.setContent(msgStr);
		log.setType("[CHAT]");
		loggsService.addLoggs(log);		
        System.out.println("[CHAT] RECEIVED String MSG=["+msgStr+"]");

    }

}
