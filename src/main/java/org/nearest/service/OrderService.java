package org.nearest.service;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Order;

public interface OrderService {
  int addOrder(Map<String, Object> params);
  Map<String, Object> getOrderCount(int clientNo);
  List<Object> getOrderList(int clientNo);
  Order getOrderInfo(Map<String, Integer> params);
  List<Map<String, Object>> getOrderDetailList(Map<String, Integer> params);
}
