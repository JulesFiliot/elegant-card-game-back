package com.cpe.springboot.conversation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;






@Service
public class ConversationService {
	private final ConversationRepository conversationRepository;
	private final MessageRepository messageRepository;

	public ConversationService(ConversationRepository conversationRepository,MessageRepository messageRepository) {
		super();
		this.conversationRepository = conversationRepository;
		this.messageRepository=messageRepository;
		
	}

	public List<Message> getConversation(String id) {
		List<Message> messages = new ArrayList<>();
		List<ConversationModel> conv;
		conv=conversationRepository.findByConversationid(id);
		if (conv.size()>0) {
			System.out.println("conversation Found 2");
			messages=conv.get(0).getMessage();
			}
		else {
			System.out.println("conversation not Found 2");
			
		}
		System.out.println(messages.toString());
		return messages;
		
		
	}
	public void updateConversation(String id,Message message) {
		
		
		
		List<Message> messages = getConversation(id);
		messages.add(message);
		List<ConversationModel> conv=conversationRepository.findByConversationid(id);
		ConversationModel conversation;
		if (conv.size()>0) {
			System.out.println("conversation found");
			conversation=conv.get(0);
			conversation.setMessage(messages);
			
		}
		else {
			System.out.println("conversation created");
			conversation=new ConversationModel(id,messages);
		}
		
		
		
		System.out.println("conv id: "+conversation.getId_conversation());
		List<Message> messages1 = conversation.getMessage();
		System.out.println(messages1.size()+" messages were found");
		for (int i = 0; i < messages1.size(); i++) {
		System.out.println("id :"+messages1.get(i).getId());
		System.out.println("id emetteur :"+messages1.get(i).getId_emetteur());
		System.out.println("message :"+messages1.get(i).getContent());}
		
		conversationRepository.save(conversation);
		message.setConversation(conversation);
		messageRepository.save(message);
	}
	

	
}
