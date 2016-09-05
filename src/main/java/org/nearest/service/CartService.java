package org.nearest.service;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Cart;
import org.nearest.domain.Product;

public interface CartService {
	
	void addCart(Cart cart);
	List<Product> getCart(int clientNo);
	void removeCart(Map<String, Object> params);
	void removeCartList(int clientNo);
}