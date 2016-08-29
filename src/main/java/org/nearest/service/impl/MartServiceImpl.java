package org.nearest.service.impl;

import java.util.List;
import java.util.Map;

import org.nearest.dao.MartDao;
import org.nearest.domain.Mart;
import org.nearest.service.MartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MartServiceImpl implements MartService {
	
	@Autowired MartDao martDao;
	
	@Override
	public List<Mart> getMartList() {
		return martDao.selectMartList();
	}

	@Override
	public Mart getMart(int no) {
		return martDao.selectMart(no);
	}
	
	@Override
	public Mart getMartByAdmin(int adminNo) {
		return martDao.selectMartByAdmin(adminNo);
	}

}
