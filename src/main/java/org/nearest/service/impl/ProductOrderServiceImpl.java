package org.nearest.service.impl;

import java.util.Map;

import org.nearest.dao.ProductOrderDao;
import org.nearest.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOrderServiceImpl implements ProductOrderService{

  @Autowired
  ProductOrderDao productOrderDao;
  
  @Override
  public void addProdOrder(Map<String, Object> params) {
    productOrderDao.insertProdOrder(params);
  }

}
