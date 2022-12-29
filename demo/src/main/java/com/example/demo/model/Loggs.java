package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Loggs")
public class Loggs {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="Id")
  private Long id;
  @Column(name="content", length = 10000)
  private String content;
  @Column(name="Type")
  private String type;
  
  
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public Loggs(Long id, String content) {
	super();
	this.id = id;
	this.content = content;
}
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
public Loggs() {
	super();
}
  
  
}