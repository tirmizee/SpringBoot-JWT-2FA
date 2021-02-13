package com.tirmizee.configuration.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties("spring.security.jwt")
public class JWTProperty {
	
	private String secret;
	private Long expire;
	private String header;
	private String prefix;
	
}
