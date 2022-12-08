package com.cpe.springboot.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.cpe.springboot.user.controller.UserAsyncService;
import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.AuthDTO;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController
public class UserRestController {

	private final UserService userService;
	private final UserAsyncService userAsyncService;
	
	public UserRestController(UserService userService,UserAsyncService userAsyncService) {
		this.userService=userService;
		this.userAsyncService = userAsyncService;
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/users")
	private List<UserDTO> getAllUsers() {
		List<UserDTO> uDTOList=new ArrayList<UserDTO>();
		for(UserModel uM: userService.getAllUsers()){
			uDTOList.add(DTOMapper.fromUserModelToUserDTO(uM));
		}
		return uDTOList;

	}
	
	@RequestMapping(method=RequestMethod.GET,value="/user/{id}")
	private UserDTO getUser(@PathVariable String id) {
		Optional<UserModel> ruser;
		ruser= userService.getUser(id);
		if(ruser.isPresent()) {
			return DTOMapper.fromUserModelToUserDTO(ruser.get());
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id:"+id+", not found",null);

	}
	
	@RequestMapping(method=RequestMethod.POST,value="/user")
	public UserDTO addUser(@RequestBody UserDTO user) {
		return userService.addUser(user);
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/user/{id}")
	public void updateUserasync(@RequestBody UserDTO user,@PathVariable String id) throws JsonProcessingException {
		user.setId(Integer.valueOf(id));
		userAsyncService.updateUserAsync(user);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/user/{id}")
	public void deleteUser(@PathVariable String id) {
		userService.deleteUser(id);
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/auth")
	private Integer getAllCourses(@RequestBody AuthDTO authDto) {
		 List<UserModel> uList = userService.getUserByLoginPwd(authDto.getUsername(),authDto.getPassword());
		if( uList.size() > 0) {
			
			return uList.get(0).getId();
		}
		throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentification Failed",null);

	}
	

}
