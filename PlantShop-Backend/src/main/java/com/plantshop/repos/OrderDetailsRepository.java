package com.plantshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.plantshop.models.Order;
import com.plantshop.models.OrderDetails;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

	List<OrderDetails> findByOrder(Order order);
}
