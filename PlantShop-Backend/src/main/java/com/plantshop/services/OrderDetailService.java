package com.plantshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plantshop.models.Order;
import com.plantshop.models.OrderDetails;
import com.plantshop.repos.OrderDetailsRepository;

@Service
public class OrderDetailService {
	@Autowired OrderDetailsRepository dao;
	
	public void saveOrderDetails(OrderDetails od) {
		dao.save(od);
	}

	public OrderDetails findById(int id) {
		return dao.findById(id).get();
	}

	public List<OrderDetails> findByOrder(Order order) {
		return dao.findByOrder(order);
	}
}
