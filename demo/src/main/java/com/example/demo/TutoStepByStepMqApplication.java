package com.example.demo;

import javax.jms.ConnectionFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;

@EnableJms
@SpringBootApplication
public class TutoStepByStepMqApplication {
	 @Autowired
	 JmsTemplate jmsTemplate;

	 
	 @EventListener(ApplicationReadyEvent.class)
	    public void doInitAfterStartup() {
	        //enable to be in topic mode! to do at start
	        jmsTemplate.setPubSubDomain(true);
	    }
	 @Bean
	 public JmsListenerContainerFactory< ? > connectionFactory(ConnectionFactory connectionFactory,
	                                                           DefaultJmsListenerContainerFactoryConfigurer configurer) {
	   DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
	   configurer.configure(factory, connectionFactory);
	   factory.setPubSubDomain(false);
	   return factory;
	 }

	public static void main(String[] args) {
		SpringApplication.run(TutoStepByStepMqApplication.class, args);
	}

}
