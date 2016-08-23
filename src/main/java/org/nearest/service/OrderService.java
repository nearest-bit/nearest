package org.nearest.service;

import java.util.Map;

public interface OrderService {
  int addOrder(Map<String, Object> params);
  Map<String, Object> getOrderCount(int clientNo);
}
