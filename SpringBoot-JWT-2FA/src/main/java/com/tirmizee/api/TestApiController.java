package com.tirmizee.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestApiController {

	@GetMapping("/test")
	public String jj() {
		return "Hello world";
	}
	
}
