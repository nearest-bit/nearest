package org.nearest.dao;

import java.util.List;
import java.util.Map;

public interface OrderDao {
    int insertOrder(Map<String, Object> params);
    Map<String, Object> selectOrderCount(int clientNo);
    List<Object> selectOrderList(int clientNo);
    
}
