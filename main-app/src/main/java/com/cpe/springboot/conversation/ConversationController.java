package com.cpe.springboot.conversation;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cpe.springboot.store.model.StoreOrder;
import com.cpe.springboot.user.model.AuthDTO;

@CrossOrigin
@RestController
@RequestMapping(value="/Conversation")
public class ConversationController {
	private final ConversationService conversationService;
	
	public ConversationController(ConversationService conversationService) {
		this.conversationService=conversationService;
	}
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	private List<Message> getAllMessages(@PathVariable String id) {
		return conversationService.getConversation(id);	

	}
	@RequestMapping(method = RequestMethod.POST, value = "/{id}")
	private void addMessages(@PathVariable String id,@RequestBody Message message) {
		conversationService.updateConversation(id,message);

	}
	

	
}
