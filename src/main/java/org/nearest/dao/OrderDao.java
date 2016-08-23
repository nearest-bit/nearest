package org.nearest.dao;

import java.util.Map;

public interface OrderDao {
    int insertOrder(Map<String, Object> params);
    Map<String, Object> selectOrderCount(int clientNo);
    
    
}
