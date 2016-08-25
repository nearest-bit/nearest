package org.nearest.dao;

import java.util.Map;

import org.nearest.domain.ProductOrder;

public interface OrderDao {
    int insertOrder(Map<String, Object> params);
    Map<String, Object> selectOrderCount(int clientNo);
    ProductOrder selectOrderList(int clientNo);
    
}
