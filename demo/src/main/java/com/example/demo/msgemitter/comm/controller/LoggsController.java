package com.example.demo.msgemitter.comm.controller;

import org.springframework.jms.annotation.JmsListener;

import org.springframework.stereotype.Controller;

import com.example.demo.model.Loggs;
import org.json.JSONObject;

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
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("SurName", msgStr.getSurName());
        jsonObject.put("LastName", msgStr.getLastName());
        jsonObject.put("id", msgStr.getId());
    	jsonObject.put("CardList", msgStr.getCardList().toString());
        jsonObject.put("Email", msgStr.getEmail());
        String jsonString = jsonObject.toString(4);
        log.setContent(jsonString);
		log.setType("[updating user]");
		loggsService.addLoggs(log);		
        System.out.println("[UPDATE USER] RECEIVED String MSG=["+jsonString+"]");

    }
	@JmsListener(destination = "notifications", containerFactory = "connectionFactory")
    public void notificationLogger(String msgStr) {
		Loggs log= new Loggs();
		JSONObject jsonObject = new JSONObject(msgStr);
		log.setContent(msgStr);
		log.setType("[notification]");
		loggsService.addLoggs(log);		
        System.out.println("[NOTIFICATION] RECEIVED String MSG=["+jsonObject.toString(4)+"]");

    }

}
