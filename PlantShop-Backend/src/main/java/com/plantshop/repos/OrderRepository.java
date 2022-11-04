package com.plantshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.plantshop.models.Customer;
import com.plantshop.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

	List<Order> findByCustomer(Customer customer);
}
