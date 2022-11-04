package com.plantshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plantshop.models.Feedback;
import com.plantshop.repos.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired FeedbackRepository dao;
	
	public Feedback saveFeedback(Feedback fb) {
		return dao.save(fb);
	}

	public Feedback findFeedbackById(int id) {
		return dao.findById(id).get();
	}
	
	public List<Feedback> listall(){
		return dao.findAll();
	}
	
}
