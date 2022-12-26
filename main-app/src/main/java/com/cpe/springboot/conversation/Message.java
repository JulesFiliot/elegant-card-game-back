package com.cpe.springboot.conversation;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="messages")
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="Id")
  private Long id;
  @Column(name="content")
  private String content;
  @Column(name="Id_emetteur")
  private int id_emetteur;
  @ManyToOne
  @JoinColumn(name = "conversation_id")
  private ConversationModel conversation;
  
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getId_emetteur() {
		return id_emetteur;
	}
	public void setId_emetteur(int id_emetteur) {
		this.id_emetteur = id_emetteur;
	}
	public ConversationModel getConversation() {
		return conversation;
	}
	public void setConversation(ConversationModel conversation) {
		this.conversation = conversation;
	}
	  

  }