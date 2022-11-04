package com.plantshop.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plantshop.dtos.ProductDTO;
import com.plantshop.dtos.Response;
import com.plantshop.models.Plant;
import com.plantshop.services.PlantService;

@CrossOrigin
@RestController
@RequestMapping("/api/plants")
public class PlantController {

@Autowired PlantService bservice;
	
	@PostMapping
	public ResponseEntity<?> savePlant(ProductDTO dto) {
		System.out.println(dto);
		Plant plant=ProductDTO.toEntity(dto);
		bservice.addPlant(plant,dto.getPic());
		return Response.success(plant);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updatePlant(@RequestBody Plant plant,@PathVariable("id") int id) {
		bservice.updatePlant(plant);
		return Response.success(plant);		
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findPlant(@PathVariable("id")int id) {
		Plant plant=bservice.findPlantById(id);
		return Response.success(plant);
	}
	
	@GetMapping
	public ResponseEntity<?> findAllProducts() {
		List<Plant> result = new ArrayList<Plant>();
		for(Plant b : bservice.allPlants()) {
			result.add(b);
		}
		return Response.success(result);
	}
	
	
	@GetMapping("cats")
	public ResponseEntity<?> findByCategory(String cat) {
		List<Plant> result = new ArrayList<Plant>();
		
		for(Plant b : bservice.categoryPlants(cat)) {
			result.add(b);
		}
		
		return Response.success(result);
	}
		
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
		bservice.deletePlant(id);
		return Response.status(HttpStatus.OK);
	}
	
}
