package org.nearest.service.impl;

import org.nearest.dao.AdminDao;
import org.nearest.domain.Admin;
import org.nearest.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired AdminDao adminDao;
	
	@Override
	public Admin getAdmin(String id) {
		return adminDao.selectOne(id);
	}

 
}
