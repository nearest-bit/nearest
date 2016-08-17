package org.nearest.service;

import java.util.List;

import org.nearest.domain.Cart;
import org.nearest.domain.Product;

public interface CartService {
	
	void addCart(Cart cart);
	List<Product> getCart(int clientNo);
}