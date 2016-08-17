package org.nearest.dao;

import java.util.List;

import org.nearest.domain.Cart;
import org.nearest.domain.Product;

public interface CartDao {
	void insertCart(Cart cart);
	List<Product> selectCartList(int clientNo);
}
