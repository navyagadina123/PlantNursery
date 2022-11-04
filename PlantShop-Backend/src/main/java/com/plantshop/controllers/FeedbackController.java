package com.plantshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plantshop.dtos.FeedbackDTO;
import com.plantshop.dtos.Response;
import com.plantshop.models.Feedback;
import com.plantshop.services.CustomerService;
import com.plantshop.services.FeedbackService;

@CrossOrigin
@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

	@Autowired private FeedbackService fservice;
	@Autowired private CustomerService cservice;
	
	@PostMapping 
	public ResponseEntity<?> save(@RequestBody FeedbackDTO dto) {
		Feedback fb=new Feedback();
		fb.setFeedback(dto.getFeedback());
		fb.setCustomer(cservice.findById(dto.getCustomerid()));
		fservice.saveFeedback(fb);
		return Response.success(fb);
	}
	
	@GetMapping
	public ResponseEntity<?> listall(Feedback fb) {
		return Response.success(fservice.listall());
	}
}
