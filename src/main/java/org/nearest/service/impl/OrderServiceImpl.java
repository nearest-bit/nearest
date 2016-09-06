package org.nearest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nearest.dao.OrderDao;
import org.nearest.domain.Admin;
import org.nearest.domain.Order;
import org.nearest.domain.QNA;
import org.nearest.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
  
  @Autowired
  OrderDao orderDao;

  @Override
  public int addOrder(Map<String, Object> params) {
    // TODO Auto-generated method stub
    return orderDao.insertOrder(params);
  }

  @Override
  public Map<String, Object> getOrderCount(int clientNo) {
    // TODO Auto-generated method stub
    return orderDao.selectOrderCount(clientNo);
  }

  @Override
  public List<Object>getOrderList(Map<String, Object> params) {
    // TODO Auto-generated method stub
    return orderDao.selectOrderList(params);
  }

  @Override
  public Order getOrderInfo(Map<String, Integer> params) {
    // TODO Auto-generated method stub
    return orderDao.selectOrderInfoOne(params);
  }

  @Override
  public List<Map<String, Object>> getOrderDetailList(Map<String, Integer> params) {
    // TODO Auto-generated method stub
    return orderDao.selectOrderDetailList(params);
  }

  
  @Override
  public Order getOrderInfoByAdmin(Map<String, Integer> params) {
    // TODO Auto-generated method stub
    return orderDao.selectOrderInfoOneByAdmin(params);
  }

  @Override
  public List<Map<String, Object>> getOrderDetailListByAdmin(Map<String, Integer> params) {
    // TODO Auto-generated method stub
    return orderDao.selectOrderDetailListByAdmin(params);
  }
  
  @Override
  public int updateOrderState(Map<String, Integer> params) {
	  return orderDao.updateOrderState(params);
  }
}
