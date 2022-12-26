package com.cpe.springboot.conversation;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="conversation")

public class ConversationModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Id")
	private int id;
	
	@Column(name="ConversationId")
	private String conversationid;
	
	@OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
	@Column(name="Messages")
	private List<Message> message;
	
	
	
	public ConversationModel(String id_conversation, List<Message> message) {
		super();
		this.conversationid = id_conversation;
		this.message = message;
	}
	public ConversationModel() {
		super();
		this.conversationid = null;
		this.message = null;
	}
	
	public String getId_conversation() {
		return conversationid;
	}
	public void setId_conversation(String id_conversation) {
		this.conversationid = id_conversation;
	}
	public List<Message> getMessage() {
		return message;
	}
	public void setMessage(List<Message> messages) {
		this.message = messages;
	}
	

}
