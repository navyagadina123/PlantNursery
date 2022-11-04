package com.plantshop.dtos;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.plantshop.models.Plant;

public class ProductDTO extends Plant {
	
	private MultipartFile pic;
	

	public MultipartFile getPic() {
		return pic;
	}


	public void setPic(MultipartFile pic) {
		this.pic = pic;
	}


	public static Plant toEntity(ProductDTO dto) {
		Plant entity=new Plant();
		BeanUtils.copyProperties(dto, entity, "pic");		
		return entity;
	}
}
