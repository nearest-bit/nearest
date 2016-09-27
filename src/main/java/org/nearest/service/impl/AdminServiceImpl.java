package org.nearest.service.impl;

import java.util.HashMap;
import java.util.List;

import org.nearest.dao.AdminDao;
import org.nearest.domain.Admin;
import org.nearest.domain.Order;
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

  
  @Override
  public int getMartNo(int martNo) {
  
    return adminDao.selectOneMartNo(martNo);
  }


  @Override
  public List<Order> getOrder(int orderNo) {
    System.out.println("orderNo: "+orderNo);
    return adminDao.selectOrderList(orderNo);
  }
  
  @Override
  public List<Order> getOrderListByCalendar(int martNo, String sdate, String edate, int orderSt) {
  	  HashMap<String, Object> params = new HashMap<>();
	  params.put("martNo", martNo);
	  params.put("startDate", sdate);
	  params.put("endDate", edate);
	  params.put("orderStatus", orderSt);
	  System.out.println(params.toString());

	  return adminDao.selectOrderListByCalendar(params);
  }
 
}