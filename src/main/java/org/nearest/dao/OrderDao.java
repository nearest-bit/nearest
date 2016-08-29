package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Order;

public interface OrderDao {
    int insertOrder(Map<String, Object> params);
    Map<String, Object> selectOrderCount(int clientNo);
    List<Object> selectOrderList(Map<String, Object> params);
    Order selectOrderInfoOne(Map<String, Integer> params);
    List<Map<String, Object>> selectOrderDetailList(Map<String, Integer> params);
    
    Order selectOrderInfoOneByAdmin(Map<String, Integer> params);
    List<Map<String, Object>> selectOrderDetailListByAdmin(Map<String, Integer> params);
    
    int updateOrderState(Map<String, Integer> params);
}
