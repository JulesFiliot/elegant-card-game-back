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

	public ConversationModel getConversation(String id) {
		
		List<ConversationModel> conv;
		conv=conversationRepository.findByConversationid(id);
		if (conv.size()>0) {
			return conv.get(0);
			}
		else {
			System.out.println("conversation not Found 2");
			ConversationModel conversation = null;
			return conversation;
			
		}
		
		
	}
	public List<Message> getMessages(String id){
		List<Message> messages = new ArrayList<>();
		ConversationModel conv = getConversation(id);
		if (conv!=null) {
			return conv.getMessage();
		}
		

		return messages;
		
		
	}
	public List<MessageDTO> getMessagesDTO(String id){
		List<MessageDTO> messagesDTO = new ArrayList<>();
		ConversationModel conv = getConversation(id);

		if (conv!=null) {
			List<Message> messages = conv.getMessage();
			for (int i = 0; i < messages.size(); i++) {
				Message message = messages.get(i);
				MessageDTO messageDTO=new MessageDTO(message.getContent(),message.getId_emetteur());
				messagesDTO.add(messageDTO);
				
			};
				
		}
		

		return messagesDTO;
		
		
	}
	public void updateConversation(String id,Message message) {
		
		
		
		List<Message> messages = getMessages(id);
		messages.add(message);
		ConversationModel conv = getConversation(id);
		ConversationModel conversation;
		if (conv!=null) {
			System.out.println("conversation found");
			conversation=conv;
			conversation.setMessage(messages);
			
		}
		else {
			System.out.println("conversation created");
			conversation=new ConversationModel(id,messages);
		}
		
		conversationRepository.save(conversation);
		message.setConversation(conversation);
		messageRepository.save(message);
		System.out.println("conv id: "+conversation.getId_conversation());
		List<Message> messages1 = conversation.getMessage();
		System.out.println(messages1.size()+" messages were found");
		for (int i = 0; i < messages1.size(); i++) {
		System.out.println("id :"+messages1.get(i).getId());
		System.out.println("id emetteur :"+messages1.get(i).getId_emetteur());
		System.out.println("message :"+messages1.get(i).getContent());}

		

		
	}
	

	
}
