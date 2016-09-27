package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Admin;
import org.nearest.domain.Order;

public interface AdminDao {
	
  Admin selectOne (String id);
  Admin getManagerLogin (String id);
  List<Admin> adminOrderList(Map<String,Object> params);
  
  int selectOneMartNo (int martNo);
  List<Order> selectOrderList (int orderNo);

  List<Order> selectOrderListByCalendar(Map<String, Object> params);
}