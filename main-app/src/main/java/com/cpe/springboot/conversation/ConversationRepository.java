package com.cpe.springboot.conversation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;



public interface ConversationRepository extends JpaRepository<ConversationModel, Long> {
	List<ConversationModel> findByConversationid(String idconv);

}
