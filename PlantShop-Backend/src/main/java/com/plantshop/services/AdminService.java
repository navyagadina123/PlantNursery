package com.plantshop.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plantshop.models.Admin;
import com.plantshop.repos.AdminRepository;

@Service
public class AdminService {
	@Autowired AdminRepository dao;

	public Admin validate(String userid, String pwd) {
		// TODO Auto-generated method stub
		Optional<Admin> admin=dao.findById(userid);
		if(admin.isPresent() && admin.get().getPwd().equals(pwd)) {
			return admin.get();
		}
		return null;
	}

	public void updateAdmin(Admin admin) {
		if(admin.getPwd().equals("") || admin.getPwd()==null) {
			admin.setPwd(dao.findById(admin.getUserid()).get().getPwd());
		}
		dao.save(admin);		
	}
}
