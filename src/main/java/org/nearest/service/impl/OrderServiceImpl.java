package org.nearest.service.impl;

import java.util.Map;

import org.nearest.dao.OrderDao;
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

}
