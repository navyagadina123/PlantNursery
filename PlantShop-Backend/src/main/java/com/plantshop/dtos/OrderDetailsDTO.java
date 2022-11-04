package com.plantshop.dtos;

import org.springframework.beans.BeanUtils;

import com.plantshop.models.OrderDetails;
import com.plantshop.models.Plant;

public class OrderDetailsDTO {
	
	private int id;
	private Plant plant;
	private int qty;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Plant getPlant() {
		return plant;
	}
	public void setPlant(Plant plant) {
		this.plant = plant;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}

	public static OrderDetailsDTO fromEntity(OrderDetails entity) {
		OrderDetailsDTO dto = new OrderDetailsDTO();
		BeanUtils.copyProperties(entity, dto);		
		return dto;
	}
}
