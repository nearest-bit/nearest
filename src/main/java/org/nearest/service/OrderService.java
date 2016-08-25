package org.nearest.service;

import java.util.List;
import java.util.Map;

import org.nearest.domain.ProductOrder;

public interface OrderService {
  int addOrder(Map<String, Object> params);
  Map<String, Object> getOrderCount(int clientNo);
  List<Object> getOrderList(int clientNo);
}
