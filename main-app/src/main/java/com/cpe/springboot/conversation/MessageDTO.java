package com.cpe.springboot.conversation;


public class MessageDTO {
	  private String content;
	  private int id_emetteur;
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
	public MessageDTO(String content, int id_emetteur) {
		super();
		this.content = content;
		this.id_emetteur = id_emetteur;
	}
	  
}
