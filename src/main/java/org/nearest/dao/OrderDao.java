package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Order;

public interface OrderDao {
    int insertOrder(Map<String, Object> params);
    Map<String, Object> selectOrderCount(int clientNo);
    List<Object> selectOrderList(int clientNo);
    Order selectOrderInfoOne(Map<String, Integer> params);
    List<Map<String, Object>> selectOrderDetailList(Map<String, Integer> params);
    
}
