package com.example.demo.msgemitter.comm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.fasterxml.jackson.core.JsonProcessingException;

import DTOuser.UserDTO;

@RestController
public class MsgEmitterRestController {
	 @Autowired
	    BusService busService;

	    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg")
	    public boolean sendInform(@RequestBody String msg) {
	        busService.sendMsg(msg);
	        return true;
	    }

	    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/{busName}")
	    public boolean sendInform(@RequestBody String msg, @PathVariable String busName) {
	        busService.sendMsg(msg,busName);
	        return true;
	    }
	    @RequestMapping(method = RequestMethod.POST, value = "/update")
	    public boolean sendInformupdate(@RequestBody UserDTO msg) throws JsonProcessingException {
	        busService.updateUserAsync(msg);
	        return true;
	    }




}
