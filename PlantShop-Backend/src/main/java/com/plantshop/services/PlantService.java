package com.plantshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.plantshop.models.Plant;
import com.plantshop.repos.PlantRepository;
import com.plantshop.utils.StorageService;

@Service
public class PlantService {

	@Autowired private StorageService storageService;
	@Autowired private PlantRepository dao;
	
	public void addPlant(Plant b, MultipartFile pic) {
		String photo=storageService.store(pic);
		b.setPhoto(photo);
		dao.save(b);
	}

	public void updatePlant(Plant b) {
		dao.save(b);
	}

	public void deletePlant(int id) {
		Plant entity=dao.findById(id).get();
		dao.delete(entity);
	}

	public List<Plant> allPlants() {
		return dao.findAll();
	}

	public Plant findPlantById(int prodid) {
		return dao.findById(prodid).get();
	}

	public List<Plant> categoryPlants(String cat) {
		System.out.println(cat);
		// TODO Auto-generated method stub
		return dao.findByCat(cat);
	}
}
