package com.plantshop.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plantshop.dtos.CartDTO;
import com.plantshop.dtos.OrderDetailsDTO;
import com.plantshop.dtos.OrderResponseDTO;
import com.plantshop.dtos.PlaceOrderDTO;
import com.plantshop.dtos.Response;
import com.plantshop.models.Address;
import com.plantshop.models.Customer;
import com.plantshop.models.Order;
import com.plantshop.models.OrderDetails;
import com.plantshop.models.Payment;
import com.plantshop.models.Plant;
import com.plantshop.services.AddressService;
import com.plantshop.services.CustomerService;
import com.plantshop.services.OrderDetailService;
import com.plantshop.services.OrderService;
import com.plantshop.services.PaymentService;
import com.plantshop.services.PlantService;

@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

	@Autowired OrderService orderService;
	@Autowired CustomerService customerService;
	@Autowired AddressService addressService;
	@Autowired PaymentService paymentService;
	@Autowired OrderDetailService orderDetailsService;	
	@Autowired PlantService plantService;	
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody PlaceOrderDTO dto) {	
		Address address=addressService.saveAddress(dto.getAddress());
		Payment payment=paymentService.savePayment(dto.getPayment());
		Order order=new Order();
		order.setAddress(address);
		order.setPayment(payment);
		order.setPaymethod(dto.getPaymethod());
		Customer customer=customerService.findById(dto.getCustomerid());
		order.setCustomer(customer);
		System.out.println("Order"+order);
		Order orders=orderService.saveOrder(order);
		
		for(CartDTO cart : dto.getCart()) {
			OrderDetails od=new OrderDetails();
			od.setOrder(orders);
			od.setQty(cart.getQty());
			Plant plant=plantService.findPlantById(cart.getId());
			od.setPlant(plant);			
			orderDetailsService.saveOrderDetails(od);
		}
		
		return Response.status(HttpStatus.OK);
	}
	
	@GetMapping("/confirm/{id}")
	public ResponseEntity<?> confirmOrder(@PathVariable("id") int id) {
		orderService.confirm(id);
		return Response.success("Confirmed");
	}
	
	@GetMapping
	public ResponseEntity<?> findAllOrders(Optional<Integer> custid) {
		List<Order> result=null;
		if(custid.isPresent()) {
			Customer customer=customerService.findById(custid.get());
			 result= orderService.getCustomerOrders(customer);
		}else {
			result = orderService.getAllOrders();
		}
		return Response.success(result);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findOrderById(@PathVariable("id") int id) {
		Order order = orderService.findById(id);
		List<OrderDetails> details=orderDetailsService.findByOrder(order);
		List<OrderDetailsDTO> detailsdto=new ArrayList<OrderDetailsDTO>();
		details.forEach(od -> {
			OrderDetailsDTO dto=OrderDetailsDTO.fromEntity(od);
			detailsdto.add(dto);
		});
		OrderResponseDTO result=new OrderResponseDTO();
		result.setOrder(order);
		result.setDetails(detailsdto);
		return Response.success(result);
	}
}
