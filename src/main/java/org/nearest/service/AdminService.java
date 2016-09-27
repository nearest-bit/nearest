package org.nearest.service;

import java.util.List;

import org.nearest.domain.Admin;
import org.nearest.domain.Mart;
import org.nearest.domain.Order;

public interface AdminService {
	
	Admin getAdmin(String id);
	
	
	int getMartNo(int adminNo);
	List<Order> getOrder (int orderNo);
	List<Order> getOrderListByCalendar(int martNo, String sdate, String edate, int orderSt);
}
