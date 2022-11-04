package com.plantshop.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.plantshop.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}
