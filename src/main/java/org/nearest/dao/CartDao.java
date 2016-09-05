package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Cart;
import org.nearest.domain.Product;

public interface CartDao {
	void insertCart(Cart cart);
	List<Product> selectCartList(int clientNo);
	void deleteCart(Map<String, Object> params);
	void deleteCartList(int clientNo);
}
