package com.tirmizee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.tirmizee.configuration.properties.JWTProperty;

@SpringBootApplication
@EnableConfigurationProperties({
	JWTProperty.class
})
public class SpringBootJwt2FaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootJwt2FaApplication.class, args);
	}

}
