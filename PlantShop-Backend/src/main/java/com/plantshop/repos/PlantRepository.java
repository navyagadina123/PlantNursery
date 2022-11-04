package com.plantshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.plantshop.models.Plant;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Integer> {

	List<Plant> findByCat(String cat);
}
